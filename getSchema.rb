require 'find'
require 'fileutils'


import_file = ""
count = 0
root_path = ARGV[0];
dest_path = ARGV[1];
if !File.directory?(dest_path) then FileUtils.mkdir(dest_path) end

Find.find(root_path) do |path|
  if path =~ /.*chema\.js/ then
    path_end = path.match(/[^\/]*\/[^\/]*$/)[0].sub(/\//, '.')
    FileUtils.cp(path, dest_path + '/' + path_end)
    import_file << "export * from './#{path_end}';\n"
    count += 1
  end
end
puts import_file
