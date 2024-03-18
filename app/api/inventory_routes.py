from flask import Blueprint, request
from app.models import db, AvatarEquipment, Equipment
from flask_login import current_user, login_required

inventory_routes = Blueprint('inventory', __name__, url_prefix='/api/equipment')


@inventory_routes.route('/current/shop')
@login_required
def get_shop_equipment():
    """
    Get all Equipment available for purchase for the Current User
    """

    all_equipment = Equipment.query.all()

    shop_equipment = []
    for shop_item in all_equipment:
        item = shop_item.to_dict()
        item['image_url'] = shop_item.image.to_dict()['url']
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
        item['image_url'] = owned_item.image.to_dict()['url']
        item['nickname'] = AvatarEquipment.query.filter(
                AvatarEquipment.equipment_id == owned_item.id and
                AvatarEquipment.avatar_id == avatar.id).one().equipment_nickname
        owned_equipment.append(item)

    return {'Equipment': owned_equipment}


@inventory_routes.route('/current/<equipment_id>', methods=['POST'])
@login_required
def collect_equipment(equipment_id):
    """
    Buy or collect a piece of Equipment for the Current User
    """

    # User does not currently have an Avatar
    if not current_user.avatar:
        return {'message': "Avatar couldn't be found"}, 404

    # Couldn't find Equipment with the specified id
    found = Equipment.query.get(equipment_id)
    if not found:
        return {'message': "Equipment couldn't be found"}, 404

    # User already owns specified Equipment
    avatar_id = current_user.avatar.id
    owned = AvatarEquipment.query.filter(
        AvatarEquipment.equipment_id == equipment_id and AvatarEquipment.avatar_id == avatar_id
        ).one_or_none()
    if owned:
        return {'message': 'Equipment already owned'}, 400

    # SUCCESS
    new_equipment = AvatarEquipment(
        avatar_id=current_user.avatar.to_dict()['id'],
        equipment_id=equipment_id
    )
    db.session.add(new_equipment)
    db.session.commit()

    return new_equipment.to_dict(), 201


@inventory_routes.route('/current/<equipment_id>', methods=['PUT', 'PATCH'])
@login_required
def rename_equipment(equipment_id):
    """
    Renames the user's piece of Equipment specified by id and returns it.
    """

    # User does not currently have an Avatar
    if not current_user.avatar:
        return {'message': "Avatar couldn't be found"}, 404

    # Couldn't find Equipment with the specified id
    found = Equipment.query.get(equipment_id)
    if not found:
        return {'message': "Equipment couldn't be found"}, 404

    # User doesn't own specified Equipment
    avatar_id = current_user.avatar.id
    owned = AvatarEquipment.query.filter(
        AvatarEquipment.equipment_id == equipment_id and AvatarEquipment.avatar_id == avatar_id
        ).one_or_none()
    if not owned:
        return {'message': 'Equipment unowned'}, 400

    # SUCCESS
    nickname = request.json.get('nickname', None)
    if nickname:
        owned.equipment_nickname = nickname
        db.session.add(owned)
        db.session.commit()

    return owned.to_dict()


@inventory_routes.route('/current/<equipment_id>', methods=['DELETE'])
@login_required
def delete_owned_equipment(equipment_id):
    """
    Deletes a piece of owned Equipment from the user's inventory.
    """

    # User does not currently have an Avatar
    if not current_user.avatar:
        return {'message': "Avatar couldn't be found"}, 404

    # Couldn't find Equipment with the specified id
    found = Equipment.query.get(equipment_id)
    if not found:
        return {'message': "Equipment couldn't be found"}, 404

    # User doesn't own specified Equipment
    avatar_id = current_user.avatar.id
    owned = AvatarEquipment.query.filter(
        AvatarEquipment.equipment_id == equipment_id and AvatarEquipment.avatar_id == avatar_id
        ).one_or_none()
    if not owned:
        return {'message': 'Equipment unowned'}, 400

    # SUCCESS
    db.session.delete(owned)
    db.session.commit()

    return {'message': 'Successfully deleted'}
