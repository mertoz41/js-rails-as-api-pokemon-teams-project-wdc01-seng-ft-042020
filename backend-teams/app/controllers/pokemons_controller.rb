class PokemonsController < ApplicationController
    def create

       nu_pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
       render json: nu_pokemon.to_json(
           :except => [:created_at, :updated_at]
       )
       
    end 

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.delete 
        render json: {message: "pokemon deleted"}
    end 


end
