class Incentive < ApplicationRecord
  validate :no_save_if_redeemed
  validates_presence_of :code

  private 

  def no_save_if_redeemed
    if self.redeemed == true
      self.errors.add(:base, "Incentive has been redeemed and cannot be updated")
    end
  end
end
