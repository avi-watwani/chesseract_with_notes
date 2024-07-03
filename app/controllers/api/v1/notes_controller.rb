class Api::V1::NotesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_note, only: %i[show edit destroy]

  def index
    notes = current_user.notes.order(created_at: :desc).map { |note| { id: note.id, title: note.title } }
    render json: notes
  end

  def create
    @note = current_user.notes.build(note_params)
    if @note.save
      render json: @note, status: :created
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  def edit
    if @note.update(note_params)
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  def show
    render json: @note
  end

  def destroy
    @note&.destroy
    render json: { message: 'Note deleted!' }
  end

  private

  def note_params
    params.require(:note).permit(:title, :content)
  end

  def set_note
    @note = current_user.notes.find_by(id: params[:id].to_i)
  end
end
