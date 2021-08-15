class Incentive < ApplicationRecord
  # validate :no_save_if_redeemed, on: :update
  validates_presence_of :code

  private 

  # def no_save_if_redeemed
  #   if self.redeemed == true && self.changed?
  #     self.errors.add(:base, "Incentive has been redeemed and cannot be updated")
  #   end
  #   # if self.attribute_was(redeemed: true) && self.attribute_will_change!(redeemd || code || id)
  #   #   self.errors.add(:base, "Incentive has been redeemed and cannot be updated")
  #   #   # raise "Incentive has been redeemed and cannot be updated"
  #   # end
  # end
end
