from flask import Blueprint, request, jsonify, abort
from app.models import Reward, db
from flask_login import current_user, login_required


reward_routes = Blueprint("rewards", __name__, url_prefix="/api/rewards")


@reward_routes.route("/current", methods=["GET"])
@login_required
def get_user_rewards():
    formatted_rewards = []

    if current_user:
        rewards = current_user.rewards
        for reward in rewards:
            formatted_rewards.append(reward.to_dict())

    return jsonify({"Rewards": formatted_rewards}), 200


@reward_routes.route("/current", methods=["POST"])
@login_required
def create_reward():
    reward_data = request.json

    if not reward_data:
        abort(400, message="Bad Request")

    new_reward = Reward(
        user_id=current_user.id,
        type=reward_data.get("type", "custom"),
        title=reward_data.get("title"),
        description=reward_data.get("description"),
        cost=reward_data.get("cost", 0),
    )

    db.session.add(new_reward)
    db.session.commit()

    return jsonify(new_reward.to_dict()), 201


@reward_routes.route("/<reward_id>", methods=["PUT"])
@login_required
def update_reward(reward_id):
    reward_data = request.json

    if not reward_data:
        abort(400, message="Bad Request")

    reward = Reward.query.get(reward_id)

    if not reward:
        abort(404, "Reward not found")

    reward.type = reward_data.get("type", reward.type)
    reward.title = reward_data.get("title", reward.title)
    reward.description = reward_data.get("description", reward.description)
    reward.cost = reward_data.get("cost", reward.cost)

    db.session.commit()

    return jsonify(reward.to_dict()), 200


@reward_routes.route("/<reward_id>", methods=["DELETE"])
@login_required
def delete_reward(reward_id):
    reward = Reward.query.get(reward_id)

    if not reward:
        abort(404, message="Reward couldn't be found")

    db.session.delete(reward)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"}), 200
