from flask import Blueprint
from app.models import Avatar, AvatarEquipment
from flask_login import current_user, login_required

inventory_routes = Blueprint("inventory", __name__, url_prefix="/api/equipment")


@inventory_routes.route("/current")
@login_required
def get_user_equipment():
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
