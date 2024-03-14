"""empty message

Revision ID: 6de42b1d63fb
Revises: 1a15f6733e83
Create Date: 2024-03-13 23:47:18.494972

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6de42b1d63fb'
down_revision = '1a15f6733e83'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('equipment', schema=None) as batch_op:
        batch_op.alter_column('type',
               existing_type=sa.VARCHAR(length=5),
               type_=sa.String(length=5),
               existing_nullable=False)

    with op.batch_alter_table('images', schema=None) as batch_op:
        batch_op.alter_column('imageable_type',
               existing_type=sa.VARCHAR(length=9),
               type_=sa.String(length=9),
               existing_nullable=False)

    with op.batch_alter_table('rewards', schema=None) as batch_op:
        batch_op.alter_column('type',
               existing_type=sa.VARCHAR(length=6),
               type_=sa.String(length=9),
               existing_nullable=False)

    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.alter_column('type',
               existing_type=sa.VARCHAR(length=5),
               type_=sa.String(length=5),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('equipment', schema=None) as batch_op:
        batch_op.alter_column('type',
               existing_type=sa.String(length=5),
               type_=sa.VARCHAR(length=5),
               existing_nullable=False)

    with op.batch_alter_table('images', schema=None) as batch_op:
        batch_op.alter_column('imageable_type',
               existing_type=sa.String(length=9),
               type_=sa.VARCHAR(length=9),
               existing_nullable=False)

    with op.batch_alter_table('rewards', schema=None) as batch_op:
        batch_op.alter_column('type',
               existing_type=sa.String(length=9),
               type_=sa.VARCHAR(length=6),
               existing_nullable=False)

    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.alter_column('type',
               existing_type=sa.String(length=5),
               type_=sa.VARCHAR(length=5),
               existing_nullable=False)

    # ### end Alembic commands ###