require 'find'
require 'fileutils'

def flatten_by_one path
  last = path.match(/[^\/]*(?=\/[^\/]*$)/)[0]
  name = path.match(/[^\/]*$/)[0]
  "#{last}.#{name}"
end

root_path = ARGV[0];
dest_path = ARGV[1];
if !File.directory?(dest_path) then FileUtils.mkdir(dest_path) end

Find.find(root_path) do |path|
  if path =~ /.*chema\.js/ then
    path_end = path.match(/[^\/]*\/[^\/]*$/)[0]
    FileUtils.cp(path, dest_path + '/' + path_end.sub(/\//, '.'))
  end
end

