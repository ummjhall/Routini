from flask import Blueprint, request
from app.models import db, AvatarEquipment, Equipment
from flask_login import current_user, login_required

inventory_routes = Blueprint('inventory', __name__, url_prefix='/api/equipment')


@inventory_routes.route('/')
@login_required
def get_shop_equipment():
    """
    Get all Equipment available for purchase for the Current User
    """
    all_equipment = Equipment.query.all()

    shop_equipment = []
    for shop_item in all_equipment:
        item = shop_item.to_dict()

        item['imgae_url'] = shop_item.image.to_dict()['url']

        shop_equipment.append(item)

    return {'Equipment': shop_equipment}


@inventory_routes.route('/current')
@login_required
def get_user_equipment():
    """
    Get all of the Current User's Equipment
    """
    avatar = current_user.avatar
    if not avatar:
        return {'Equipment': []}

    owned_equipment = []
    for owned_item in avatar.equipment:
        item = owned_item.to_dict()

        item['user_id'] = current_user.id
        item['imgae_url'] = owned_item.image.to_dict()['url']
        item['nickname'] = AvatarEquipment.query.filter(
                AvatarEquipment.equipment_id == owned_item.id).first().equipment_nickname

        owned_equipment.append(item)

    return {'Equipment': owned_equipment}


@inventory_routes.route('/current', methods=['POST'])
@login_required
def collect_equipment():
    """
    Buy or collect a piece of Equipment for the Current User
    """

    equipment_id = request.json.get('equipment_id', None)

    # Body validation errors
    if not equipment_id:
        return {'equipment_id': 'Equipment id is required'}, 400

    # User already owns specified equipment
    owned_equipment = current_user.avatar.equipment
    for item in owned_equipment:
        if item.to_dict()['id'] == equipment_id:
            return {'message': 'Equipment already owned'}, 400

    # Couldn't find Equipment with the specified id
    try:
        equipment = Equipment.query.filter(Equipment.id == equipment_id).one()
    except:
        return {'message': "Equipment couldn't be found"}, 404

    # SUCCESS
    new_equipment = AvatarEquipment(
        avatar_id=current_user.avatar.to_dict()['id'],
        equipment_id=equipment_id
    )
    db.session.add(new_equipment)
    db.session.commit()

    return new_equipment.to_dict(), 201
