import React, { Component } from "react"
// import ReactDOM from "react-dom"
// import WorldMap from "ne_50m_admin.json";
import NorthAmerica from "ne_50m_admin.json";
// import NorthAmerica from "USA2.json";
// import NorthAmerica from "gadm36_USA_2.json";
// import NorthAmerica from "cb_2017_us_zcta510_500k.json";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
  Markers,
  Marker,
} from "react-simple-maps"

class BasicMap extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      zoom: 1,
      longtitude: this.props.longtitude,
      lattitude: this.props.lattitude,
      props: props,
      center:[0,20]
    };
    
    console.log('CHECK TO SEE IF UPDATE',this.state.longtitude,this.state.lattitude)
    
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }
  componentDidUpdate(prevProps){
    console.log(this.props)
    console.log(this.prevProps)
    if (this.props.lattitude !== prevProps.lattitude) {
      this.setState({
        longtitude: this.props.longtitude,
        lattitude: this.props.lattitude,
        center: [this.props.lattitude, this.props.longtitude],
        zoom: this.state.zoom * 4
      });
    }
  }

  // handlePropsUpdate(){
  //   console.log(this.props)
  //   let tempLong = this.props.longtitude;
  //   let tempLatt = this.props.lattitude;
  //   console.log(tempLong, tempLatt);
  //   this.setState({
  //     longtitude: tempLong,
  //     lattitude: tempLatt,
  //   })

  // }

  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom * 2
    });
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 2
    });
  }
  render() {
    const { longtitude, lattitude, center} = this.state
    // this.handlePropsUpdate();
    console.log("MAP LONG AND LATT",longtitude, lattitude);
    // console.log('THESE ARE MY', props)

    return <div>
        <button onClick={this.handleZoomIn}>{"Zoom in"}</button>
        <button onClick={this.handleZoomOut}>{"Zoom out"}</button>
        <hr />
        <ComposableMap>
          <ZoomableGroup zoom={this.state.zoom}
          center={center}
          // center={[0,0]}
          >
            <Geographies geography={NorthAmerica}>
              {(geographies, projection) => geographies.map(geography => (
                  <Geography
                    key={geography.id}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: "white",
                        stroke: "#000000",
                        strokeWidth: 0.5,
                        outline: "none"
                      }
                    }}
                  />
                ))}
            </Geographies>
            <Markers>
              <Marker 
              marker={{ coordinates: [lattitude, longtitude] }} 
              style={{ 
                default: { fill: "#008080" }, 
                hover: { fill: "#008080" }, 
                pressed: { fill: "#000" } 
              }}>
                <circle cx={0} cy={0} r={10} />
                
              <path class="custom-marker" d="M49.032,15.437c-0.205-0.774-0.625-1.6-0.935-2.321C44.386,4.198,36.278,1,29.73,1   c-8.765,0-18.418,5.878-19.707,17.992v2.476c0,0.104,0.035,1.031,0.086,1.495c0.723,5.773,5.277,11.909,8.68,17.684   c3.66,6.185,7.459,12.27,11.222,18.354c2.32-3.97,4.633-7.989,6.9-11.859c0.618-1.134,1.336-2.267,1.954-3.351   c0.412-0.721,1.2-1.443,1.561-2.113c3.66-6.701,9.551-13.455,9.551-20.104v-2.735C49.977,18.118,49.085,15.592,49.032,15.437z    M29.89,27.86c-2.576,0-5.396-1.288-6.786-4.847c-0.208-0.566-0.193-1.701-0.193-1.805v-1.598c0-4.537,3.853-6.598,7.203-6.598   c4.124,0,7.313,3.298,7.313,7.423C37.427,24.562,34.015,27.86,29.89,27.86z" id="Facebook_Places_3_" />

              
              </Marker>
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>;
  }
}

export default BasicMap