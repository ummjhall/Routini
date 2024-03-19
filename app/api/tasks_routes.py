from flask import Blueprint, request, abort
from app.models import Task, User
from flask_login import current_user, login_required
from datetime import datetime, date
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
    return formatted_res, 200

@tasks_routes.route("/current", methods = ['POST'])
@login_required
def create_new_task():
    format = '%Y-%m-%d %H:%M:%S'
    req_body = request.json
    start_date_obj = None
    due_date_obj = None
    repeats_every_val = 1
    if 'repeats_every' in req_body:
        repeats_every_val = req_body['repeats_every']
    if 'start_date' in req_body:
        start_date_obj = datetime.strptime(req_body['start_date'], format)
    if 'due_date' in req_body:
        due_date_obj = datetime.strptime(req_body['due_date'], format)
    new_task = Task(
        user_id=current_user.id,
        type=req_body['type'],
        title=req_body['title'],
        description=req_body['description'],
        difficulty=req_body['difficulty'],
        start_date=start_date_obj,
        repeats_every=repeats_every_val,
        due_date=due_date_obj
    )
    db.session.add(new_task)
    db.session.commit()
    return new_task.to_dict(), 201

@tasks_routes.route("/<task_id>", methods = ['PUT'])
@login_required
def update_task_by_id(task_id):
    req_body = request.json
    format = '%Y-%m-%d %H:%M:%S'
    task = Task.query.get(task_id)
    if not task:
        return {"errors": {"message": "Task couldn't be found"}}, 404
    elif task and task.user_id != current_user.id:
        return { "errors": {
  "message": "Forbidden"
        }}
    else:
        task.type = req_body['type']
        task.title = req_body['title']
        task.description = req_body['description']
        task.difficulty = req_body['difficulty']
        if 'start_date' in req_body:
            start_date = datetime.strptime(req_body['start_date'], format)
            task.start_date = start_date
        else: task.start_date = task.start_date
        if 'due_date' in req_body:
            due_date = datetime.strptime(req_body['due_date'], format)
            task.due_date = due_date
        else: task.due_date = task.due_date
        if 'repeats_every' in req_body:
            repeats_every_val = req_body['repeats_every']
            task.repeats_every = repeats_every_val
        else: task.repeats_every = task.repeats_every
        db.session.commit()
        return task.to_dict(), 200

@tasks_routes.route("/<task_id>", methods = ['PUT'])
@login_required
def delete_task_by_id(task_id):
    task = Task.query.get(task_id)
    if not task:
        return {"errors": {
            "message": "Task not found"
                }}, 404
    else:
        db.session.delete(task)
        db.session.commit()
        return "Task deleted", 200
