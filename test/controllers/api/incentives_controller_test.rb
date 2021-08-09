require 'test_helper'

class Api::IncentivesControllerTest < ActionDispatch::IntegrationTest
  describe 'GET #index' do
    subject { get '/api/incentives' }

    setup do
      create(:incentive, code: 'COUPON!')
    end

    it 'should return all incentives' do
      subject
      assert_response :ok
      data = response.parsed_body
      assert_equal 1, data.size
      assert_equal 'COUPON!', data[0]['code']
      assert data[0].key? 'id'
    end
  end

  describe 'PUT #update' do
    subject { put "/api/incentives/#{incentive.id}", params: {incentive: params} }

    let(:incentive) { create(:incentive) }
    let(:params) { {code: 'FOOBAR'} }

    it 'should update the incentive' do
      subject
      assert_response :success
      assert_equal 'FOOBAR', incentive.reload.code
    end
  end

  describe 'POST #create' do
    subject { post api_incentives_path, params: { incentive: {code: code} } }
    
    let(:code) {'Summer25!'}
    
    it 'should create a new incentive' do
      previous_count = Incentive.count
      subject
      assert_response :success
      new_count = Incentive.count
      new_count - 1 == previous_count
      Incentive.last.code == code
    end
  end
end
