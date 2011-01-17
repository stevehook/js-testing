require "rubygems"
require "watir"

test_folder = 'tests/jasmine'
#TODO: set test_folder from an optional input parameter

def run_test(file_name)
  puts "Running tests for #{file_name}"
  Watir::Browser.default = 'firefox'
  browser = Watir::Browser.new
  browser.goto file_name
  sleep 5
  Watir::Waiter::wait_until(5, 0.1) { browser.element_by_xpath("//div[contains(@class, 'runner')]/span/a[@class='description']") }
  results_paragraph = browser.element_by_xpath("//div[contains(@class, 'runner')]/span/a[@class='description']")
  if results_paragraph.exists?
    puts results_paragraph.text
  else
    puts 'Test failed to run'
  end
  # parse the output from the test and print error messages for failing tests
  browser.elements_by_xpath("//div[@class='spec failed']/a[@class='description']").each_with_index do |div, index|
    puts "  #{index} - #{div.text}"
  end
  browser.close
end

Dir.foreach(test_folder) do |file_name|
  run_test("file://#{File.expand_path(test_folder)}/#{file_name}") if file_name =~ /.html$/
end
#TODO: collect the results of the tests and print out a summary

