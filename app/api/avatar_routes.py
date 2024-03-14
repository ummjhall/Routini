from flask import Blueprint, request, jsonify, abort
from app.models import Avatar, db
from flask_login import current_user, login_required


avatar_routes = Blueprint("avatars", __name__, url_prefix="/api/avatars")


@avatar_routes.route("/current", methods=["GET"])
@login_required
def get_users_avatar():
    if current_user:
        current_avatar = current_user.avatar

        if not current_avatar:
            abort(404, "Avatar couldn't be found")

        if current_avatar:
            avatar_image = current_avatar.image.to_dict()["url"]
            formatted_avatar = current_avatar.to_dict()
            formatted_avatar["image_url"] = avatar_image

    return formatted_avatar, 200


@avatar_routes.route("/current", methods=["POST"])
@login_required
def create_avatar():
    avatar_data = request.json

    if not avatar_data:
        abort(400, message="Bad Request")

    new_avatar = Avatar(
        user_id=current_user.id,
        name=avatar_data.get("name"),
        bio=avatar_data.get("bio"),
    )

    db.session.add(new_avatar)
    db.session.commit()

    return new_avatar.to_dict(), 201


# @reward_routes.route("/<reward_id>", methods=["PUT"])
# @login_required
# def update_reward(reward_id):
#     reward_data = request.json

#     if not reward_data:
#         abort(400, message="Bad Request")

#     reward = Reward.query.get(reward_id)

#     if not reward:
#         abort(404, "Reward not found")

#     reward.type = reward_data.get("type", reward.type)
#     reward.title = reward_data.get("title", reward.title)
#     reward.description = reward_data.get("description", reward.description)
#     reward.cost = reward_data.get("cost", reward.cost)

#     db.session.commit()

#     return jsonify(reward.to_dict()), 200


# @reward_routes.route("/<reward_id>", methods=["DELETE"])
# @login_required
# def delete_reward(reward_id):
#     reward = Reward.query.get(reward_id)

#     if not reward:
#         abort(404, message="Reward couldn't be found")

#     db.session.delete(reward)
#     db.session.commit()

#     return jsonify({"message": "Successfully deleted"}), 200
