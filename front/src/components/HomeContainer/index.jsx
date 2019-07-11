import React from "react";
import AnimationPage from "./home";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/user";
import Axios from "axios";

class HomeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      cardList:[]
    };
  }
  componentDidMount(){
    Axios.get('/api/allowance/list')
      .then(cardList=>{

          this.setState({cardList:cardList.data})
      })
  }
  render() {
    return (
      <div>
        <AnimationPage 
        cardList = {this.state.cardList}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  null,
  mapDispatchToProps
)(HomeContainer);