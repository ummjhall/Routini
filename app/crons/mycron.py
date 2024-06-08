from app.models import Avatar, Task, db
import time

def check_missed_dailies():
    print(time.strftime("%A, %d. %B %Y %I:%M:%S %p"))
