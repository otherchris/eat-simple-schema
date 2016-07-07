require 'fileutils'

text = File.open('src/App/SchemaHelper.js').read
out = ""
text.each_line do |line|
  if line.include?('import') then
    line.sub!('meteor/aldeed:simple-schema', '../SimpleSchema')
    line.sub!('{ SimpleSchema }', 'SimpleSchema')
    line.sub!(/\/schema/, '.schema')
    if line.include?('Random') then line = '' end
    out << line
  else
    line.sub!('Random.id()', '0')
    line.sub!(/Match.*$/, '0,')
    out << line
  end
end
FileUtils.rm('src/App/SchemaHelper.js')
File.open('src/App/SchemaHelper.js', 'w'){ |file| file.write(out) }

