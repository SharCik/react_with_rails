# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


1.upto(10) do |i|
  Event.create(name: "Event #{i}",
               description: "It,s sample event with number #{i}",
               event_date: Date.today + rand(3).month,
               place: "random place number #{i}")
end