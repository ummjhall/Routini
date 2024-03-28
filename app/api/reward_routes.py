from flask import Blueprint, request
from app.models import Reward, db
from flask_login import current_user, login_required
from app.forms import RewardForm


reward_routes = Blueprint("rewards", __name__, url_prefix="/api/rewards")


@reward_routes.route("/current", methods=["GET"])
@login_required
def get_user_rewards():
    """
    Get all of the Current User's Rewards
    """
    formatted_rewards = []

    # Check if there is a current user
    if current_user:
        # Retrieve rewards associated with the current user
        rewards = current_user.rewards
        for reward in rewards:
            formatted_rewards.append(reward.to_dict())

    return {"Rewards": formatted_rewards}, 200


@reward_routes.route("/current", methods=["POST"])
@login_required
def create_reward():
    """
    Create a Reward for the Current User
    """
    form = RewardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    # Get reward data from the request's JSON payload
    reward_data = request.json

    errors = {}

    # Validate the reward form
    if form.validate_on_submit():
        # Create a new reward object
        new_reward = Reward(
            user_id=current_user.id,
            type=reward_data.get("type", "custom"),
            title=reward_data.get("title"),
            description=reward_data.get("description", None),
            cost=reward_data.get("cost", 0),
        )

        db.session.add(new_reward)
        db.session.commit()

        return new_reward.to_dict(), 201
    else:
        # Handle form validation errors
        for field, error_msgs in form.errors.items():
            for msg in error_msgs:
                if field not in errors:
                    errors[field] = []
                errors[field].append(msg)

    # Add custom error messages for specific form fields
    if "type" in form.errors and "This field is required." in form.errors["type"]:
        errors["type"] = "Type is required"

    if "title" in form.errors and "This field is required." in form.errors["title"]:
        errors["title"] = "Title is required"

    # if "cost" in form.errors and "This field is required." in form.errors["cost"]:
    #     errors["cost"] = "Cost is required"

    return {"message": "Bad request", "errors": errors}, 400


@reward_routes.route("/current/<reward_id>", methods=["PUT", "PATCH"])
@login_required
def update_reward(reward_id):
    """
    Edit a Reward belonging to the Current User
    """
    reward_data = request.json
    reward = Reward.query.get(reward_id)

    # Check if the reward data and reward object exist
    if not reward_data and not reward:
        return {"message": "Reward couldn't be found"}, 404

    if not reward:
        return {"message": "Reward couldn't be found"}, 404

    # Check if the user owns the reward
    owned_rewards = current_user.rewards
    owned = any(reward.to_dict()["id"] == int(reward_id) for reward in owned_rewards)

    if not owned:
        return {"message": "Forbidden"}, 403

    # Return the reward object if no data was provided
    if not reward_data:
        return reward.to_dict(), 200

    # Update the reward object with the provided data
    reward.type = reward_data.get("type", reward.type)
    reward.title = reward_data.get("title", reward.title)
    reward.description = reward_data.get("description", reward.description)
    reward.cost = reward_data.get("cost", reward.cost)

    db.session.commit()

    return reward.to_dict(), 200


@reward_routes.route("/current/<reward_id>", methods=["DELETE"])
@login_required
def delete_reward(reward_id):
    """
    Delete a Reward belonging to the Current User
    """
    reward = Reward.query.get(reward_id)
    owned = False
    owned_rewards = current_user.rewards

    # Check if the reward exists
    if not reward:
        return {"message": "Reward couldn't be found"}, 404

    # Check if the user owns the reward
    for reward in owned_rewards:
        if reward.to_dict()["id"] == int(reward_id):
            owned = True
            break

    if not owned:
        return {"message": "Forbidden"}, 403

    db.session.delete(reward)
    db.session.commit()

    return {"message": "Successfully deleted"}, 200
