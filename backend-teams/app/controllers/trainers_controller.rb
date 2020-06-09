class TrainersController < ApplicationController
    def index
        render json: Trainer.all.to_json(
        :include => {:pokemons => {
            :only => [:id, :nickname, :species]
        }},    
        :except => [:created_at, :updated_at])
    end 
end
