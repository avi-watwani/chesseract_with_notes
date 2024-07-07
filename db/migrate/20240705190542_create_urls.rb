class CreateUrls < ActiveRecord::Migration[7.1]
  def change
    create_table :urls do |t|
      t.string :original
      t.string :short

      t.timestamps
    end
  end
end
