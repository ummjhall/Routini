import time
import atexit
from mycron import check_missed_dailies
from apscheduler.schedulers.background import BackgroundScheduler



scheduler = BackgroundScheduler()
scheduler.add_job(func=check_missed_dailies, trigger="interval", seconds=1800)
scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())
