module Api
  class EventsController < ApplicationController
    def index
      render json: Event.all
    end

    def search
      query = params[:query]
      events = Event.where('name Like ? OR place LIKE ? OR description LIKE ?', "%#{query}%", "%#{query}%", "%#{query}%")

      render json: events
    end
  end
end