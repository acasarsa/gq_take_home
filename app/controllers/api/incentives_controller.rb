class Api::IncentivesController < ApplicationController

  def index
    @incentives = Incentive.all
    
    render json: @incentives.to_json
  end

  def create
    @incentive = Incentive.create!(incentive_params)
    
    render json: @incentive.to_json
  end
  
  def update
    @incentive = Incentive.find(params[:id])
    
    @incentive.update!(incentive_params)
    render json: @incentive.to_json
  end

  private

  def incentive_params
    params.require(:incentive).permit(:code, :redeemed)
  end
end
