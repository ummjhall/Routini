from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """

    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails.
    """

    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user, logs them in as the current user, and returns the user's information.
    """

    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # SUCCESS
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict(), 201

    # Body validation errors
    errors = {}
    if 'username' in form.errors and 'This field is required.' in form.errors['username']:
        errors['username'] = 'Username is required'
    if 'email' in form.errors:
        if 'This field is required.' in form.errors['email']:
            errors['email'] = 'Email is required'
        elif 'Invalid email address.' in form.errors['email']:
            errors['email'] = 'Invalid email'
    if 'password' in form.errors and 'This field is required.' in form.errors['password']:
        errors['password'] = 'Password is required'
    if errors:
        return {'message': 'Bad request', 'errors': errors}, 400

    # User already exists with the specified username or email
    errors = {}
    if 'username' in form.errors and 'Username is already in use.' in form.errors['username']:
        errors['username'] = 'Username is already in use'
    if 'email' in form.errors and 'Email address is already in use.' in form.errors['email']:
        errors['email'] = 'Email address is already in use'
    if errors:
        return {'message': 'User already exists', 'errors': errors}, 400

    return {'message': 'Unexpected error'}


@auth_routes.route('/login', methods=['POST'])
def log_in():
    """
    Logs in a user with valid credentials and returns the user's information.
    """

    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually so validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    # SUCCESS
    if form.validate_on_submit():
        user = User.query.filter(User.username == form.data['credential']).first()
        if not user:
            user = User.query.filter(User.email == form.data['credential']).first()
        login_user(user)
        return user.to_dict()

    # Body validation errors
    errors = {}
    if 'credential' in form.errors and 'This field is required.' in form.errors['credential']:
        errors['credential'] = 'Username or email is required'
    if 'password' in form.errors and 'This field is required.' in form.errors['password']:
        errors['password'] = 'Password is required'
    if errors:
        return {'message': 'Bad request', 'errors': errors}, 400

    # Invalid credentials
    for key in form.errors:
        if 'Invalid credentials' in form.errors[key]:
            return {'message': 'Invalid credentials'}, 401

    return {'message': 'Unexpected error'}, 500


@auth_routes.route('/current')
def get_user():
    """
    Returns the information about the user that is logged in.
    """

    if not current_user.is_authenticated:
        return {"user": None}
    return current_user.to_dict()


@auth_routes.route('/logout', methods=['DELETE'])
@login_required
def logout():
    """
    Logs out the user.
    """

    logout_user()
    return {'message': 'Success'}
