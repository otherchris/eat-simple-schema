require 'find'

root_path = ARGV[0];

schema_paths = []
Find.find(root_path) do |path|
  schema_paths << path if path =~ /.*chema\.js/
end

puts schema_paths
