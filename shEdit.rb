require 'fileutils'

text = File.open('src/App/SchemaHelper.js').read
out = ""
text.each_line do |line|
  if line.include?('import') then
    line.sub!('meteor/aldeed:simple-schema', '../SimpleSchema')
    if line.include?('Random') then line = '' end
    out << line
  else
    line.sub!('Random.id()', '0')
    out << line
  end
end
puts out

