require 'find'
require 'fileutils'

root_path = ARGV[0];
dest_path = ARGV[1];
if !File.directory?(dest_path) then FileUtils.mkdir(dest_path) end

Find.find(root_path) do |path|
  if path =~ /.*chema\.js/ then
    path_split = path.match(/(.*\/)(?=[^\/]*$)([^\/]*$)/)
    dir = "#{dest_path}/#{path_split[1].match(/[^\.\/].*/)[0]}"
    fname = path_split[2]
    if !File.directory?(dir) then FileUtils.mkdir_p(dir) end
    FileUtils.cp_r(path, "#{dir}/#{fname}")
  end
end
