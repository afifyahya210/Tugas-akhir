import React, { Component } from "react";
import axios from "axios";
import { Modal } from "antd";
import "antd/dist/antd.css";
export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      renderHome : true,
      visible: false,
      results : [],
    };
  }

  handleButton = (type) => {
    this.setState({
      renderHome : type,
    });
  };
  handleModal = (results) => {
    this.setState({
      visible: true,
      judul : results.judul,
      img_src : results.img_src,
      rating : results.rating,
      sinopsis : results.sinopsis,
    });
  };

  componentDidMount() {
    axios({
      method: "get",
      url: "https://api.npoint.io/4f6dfd197318ac7125ff",
      headers: {
        accept: "*/*",
      },
    })
      .then((data) => {
        console.log(data.data);
        this.setState({
            listData: data.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.renderHome)
    return (
      <div>
        <div className="topnav">

          <button
            onClick={() => this.setState({ renderHome: false })}
          >Anime</button>
          <button
            class="active"
            onClick={() => this.setState({ renderHome: true })}
          >About Me</button>
        </div>
        <center><h2>
          <p style={{ fontSize: 24, fontWeight: 'bold', color: 'black', fontFamily: 'Time New Roman' }}>Tentang Aku</p>
          <img src={'/profil.jpg'} ></img>
          <p style={{ fontSize: 18, fontWeight: 'bold', color: 'black', fontFamily: 'Time New Roman' }}>Alfa Husni Mubarok</p>
          <p style={{ fontSize: 14, fontWeight: 'bold', color: 'black', fontFamily: 'Time New Roman' }}>21120118130064</p>
          <p style={{ fontSize: 14, fontWeight: 'bold', color: 'black', fontFamily: 'Time New Roman' }}>08985474989</p>

        </h2></center>
      </div>
    );

    else
    return (
      <div>
        <div className="topnav">
        <button
              class="active"
              onClick={() => this.handleButton(false)}
            >Anime</button>
            <button
              onClick={() => this.handleButton(true)}
            >About Me</button>
          </div>

          <div className="boxRed">
          <center>
            <h1 style={{ fontWeight: "bolder", fontSize: 50, color: 'black' }}>Daftar Anime</h1>
          </center>
          <Modal
            title="Tentang Anime"
            centered
            visible={this.state.visible}
            onOk={() => this.setState({ visible: false })}
            onCancel={() => this.setState({ visible: false })}
            width={500}
          >
            <div style={{ textAlign: "center" }}>
                <center><td rowSpan="8"><img src={this.state.img_src} alt="anime" width="128px" /></td></center>
                <p style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Time New Roman' }}>{this.state.judul}</p>
                <p style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Time New Roman' }}>Rating : {this.state.rating}</p>
                <p style={{ fontSize: 15, fontFamily: 'Time New Roman' }}>Sinopsis : {this.state.sinopsis}</p>
            </div>
          </Modal>

           {this.state.listData.map((results) => {
            return (
              <div className="card" key={results.id}style={{ margin: 40 }}>
                <div className="card-body">
                  <center><td rowSpan="8"><img src={results.img_src} alt="anime" width="128px" /></td> </center>
                  <center><h6 className="card-title">{results.judul}</h6></center>                       
                </div>
                <center><button 
                style={{ borderColor: 'transparent', borderRadius: 10, backgroundColor: 'black', color: 'white' }}
                  className="button"
                  onClick={() => this.handleModal(results)}
                >
                  {" "}
                  Tentang Anime
                </button></center>
              </div>
            );
          })} 
        </div>
      </div>
    );
  }
}
