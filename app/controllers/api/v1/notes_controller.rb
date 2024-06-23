class Api::V1::NotesController < ApplicationController
  before_action :set_note, only: %i[show destroy]

  def index
    notes = Note.all.order(created_at: :desc)
    notes = notes.map { |note| { title: note.title, content: note.content } }
    render json: notes
  end

  def create
    note = Note.create!(note_params)
    if note
      render json: note
    else
      render json: note.errors
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
    params.permit(:content)
  end

  def set_note
    @note = Note.find_by(id: params[:id].to_i)
  end
end
