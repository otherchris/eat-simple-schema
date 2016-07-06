require 'find'
require 'fileutils'


import_file = "import _ from 'lodash';\n"
count = 0
root_path = ARGV[0];
dest_path = ARGV[1];
if !File.directory?(dest_path) then FileUtils.mkdir(dest_path) end

Find.find(root_path) do |path|
  if path =~ /.*chema\.js/ then
    path_end = path.match(/[^\/]*\/[^\/]*$/)[0].sub(/\//, '.')
    FileUtils.cp(path, dest_path + '/' + path_end)
    import_file << "import * as S#{count} from './#{path_end}';\n"
    count += 1
  end
end
import_file << "const objs = ["
count.times do |i|
  import_file << "...S#{i},"
end
import_file.chop!
import_file << "];\n"
import_file << "export default _.assign(...objs);"
puts import_file
