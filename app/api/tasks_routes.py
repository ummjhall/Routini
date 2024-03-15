from flask import Blueprint, request, abort
from app.models import Task, User
from flask_login import current_user, login_required
from datetime import datetime
from app import db

tasks_routes = Blueprint("tasks", __name__, url_prefix="/api/tasks")

@tasks_routes.route("/current")
@login_required
def get_users_tasks():
    formatted_res = {"Tasks": []}
    user_tasks = Task.query.filter(Task.user_id == current_user.id).all()
    for task in user_tasks:
        task = task.to_dict()
        formatted_res['Tasks'].append(task)
    return formatted_res

@tasks_routes.route("/current", methods = ['POST'])
@login_required
def create_new_task():
    format = '%Y-%m-%d %H:%M:%S'
    req_body = request.json
    due_date = datetime.strptime(req_body['due_date'], format)
    start_date = datetime.strptime(req_body['start_date'], format)
    new_task = Task(
        user_id=current_user.id,
        type=req_body['type'],
        title=req_body['title'],
        description=req_body['description'],
        difficulty=req_body['difficulty'],
        start_date=start_date,
        repeats_every=req_body['repeats_every'],
        due_date=due_date
    )
    db.session.add(new_task)
    db.session.commit()
    return new_task.to_dict(), 201

@tasks_routes.route("/<task_id>", methods = ['PUT'])
@login_required
def update_task_by_id(task_id):
    req_body = request.json
    if req_body:
        format = '%Y-%m-%d %H:%M:%S'
        due_date = datetime.strptime(req_body['due_date'], format)
        start_date = datetime.strptime(req_body['start_date'], format)
    task = Task.query.get(task_id)
    if not task:
        abort(404, "Task not Found")
    else:
        task.type = req_body['type']
        task.title = req_body['title']
        task.description = req_body['description']
        task.difficulty = req_body['difficulty']
        task.start_date = start_date
        task.due_date = due_date

        db.session.commit()
        return task.to_dict(), 200

@tasks_routes.route("/<task_id>", methods = ['PUT'])
@login_required
def delete_task_by_id(task_id):
    task = Task.query.get(task_id)
    if not task:
        abort(404, "Task not Found")
    else:
        db.session.delete(task)
        db.session.commit()
        return "Task deleted", 200
