class AddNotNullConstraintToUserIdInNotes < ActiveRecord::Migration[7.1]
  def change
    change_column_null :notes, :user_id, false
  end
end
