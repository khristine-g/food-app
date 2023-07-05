class FoodSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :quantity, :image
end
