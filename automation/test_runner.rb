require "rubygems"
require "watir"

test_folder = 'tests/qunit'
#TODO: set test_folder from an optional input parameter

def run_test(file_name)
  puts "Running tests for #{file_name}"
  Watir::Browser.default = 'firefox'
  browser = Watir::Browser.new
  browser.goto file_name
  results_paragraph = browser.p :id, 'qunit-testresult'
  if results_paragraph.exists?
    puts results_paragraph.text
  else
    puts 'Test failed to run'
  end
  # parse the output from the test and print error messages for failing tests
  browser.elements_by_xpath("//ol[@id='qunit-tests']/li").each_with_index do |li, index|
    if li.class_name == 'fail'
      puts "  #{index} - #{li.text}"
    end
  end
  #TODO: find the failing tests and list them
  browser.close
end

Dir.foreach(test_folder) do |file_name|
  run_test("file://#{File.expand_path(test_folder)}/#{file_name}") if file_name =~ /.html$/
end
#TODO: collect the results of the tests and print out a summary

