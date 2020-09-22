import React, { Component } from "react"
// import { feature } from "topojson-client"
// import {get} from "axios"
// import NorthAmerica from "ne_50m_admin.json";
import NorthH from "map.json";
// import World from "output.json";



import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
  Annotation,
} from "react-simple-maps";

class BasicMap extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      zoom: 1,
      longtitude: this.props.longtitude,
      lattitude: this.props.lattitude,
      locationTitle: this.props.locationTitle,
      activeSearch: this.props.activeSearch,
      // props: props,
      mapWindowWidth: window.innerWidth / 2,
      center:[0,20],
      geographyPaths:[],
      NorthAmericaNo:{}

    };
    
    
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.loadPaths = this.loadPaths.bind(this)
    
  }
  
  componentDidMount(){
    this.loadPaths()
  }
  
  loadPaths() {
    
    // get("/maps/ne_50m_admin.json")
    //   .then(res => {
      //     if (res.status !== 200) return
      //     const world = res.data
      //     // Transform your paths with topojson however you want...
      // const countries = feature(NorthAmerica121899, NorthAmerica121899.objects[Object.keys(NorthAmerica121899.objects)[0]]).features;
      //     this.setState({ NorthAmerica: countries });
      //   })
    }
    
    
    componentDidUpdate(prevProps){
      console.log(this.props)
      // console.log(this.prevProps)
      if (this.props.lattitude !== prevProps.lattitude) {
        this.setState({
          longtitude: this.props.longtitude,
          lattitude: this.props.lattitude,
          locationTitle: this.props.locationTitle,
          activeSearch: this.props.activeSearch,
          center: [this.props.lattitude, this.props.longtitude],
          zoom: this.state.zoom * 40,
          mapWindowWidth: window.innerWidth / 2
        });
      }
      console.log("locationTitle====>>>", this.state.locationTitle);
      
      
    }
    
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
      const { longtitude, lattitude, center, locationTitle, activeSearch, mapWindowWidth } = this.state;
      console.log("activeSearch===>>>>", activeSearch);
      // console.log(NorthAmerica);
      // console.log("MAP LONG AND LATT",longtitude, lattitude);
      console.log('CHECK TO SEE IF UPDATE',this.state )
      // let checkWidth = window.innerWidth / 2
      return <div className={`zoom-map-${activeSearch}`}>
        <button onClick={this.handleZoomIn}>{"Zoom in"}</button>
        <button onClick={this.handleZoomOut}>{"Zoom out"}</button>
        <hr />
        <ComposableMap
        className="svg-map"
        // width={checkWidth}
        // height={301}
        >
          <ZoomableGroup 
          zoom={this.state.zoom}
          center={center}
          >

          <Geographies geography={NorthH}>
              {(geographies, projection) => geographies.map((geography, index ) => (
                  <Geography
                  
                    key={index}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: "white",
                        stroke: "#000000",
                        strokeWidth: 0.05,
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
              {/* <path d="M67.3,41.3c0-11.7-9.5-21.2-21.2-21.2c-11.7,0-21.2,9.5-21.2,21.2c0,9.6,6.7,18.2,15.9,20.6l1.8,4.8   c-5,0.3-13.4,1.5-13.4,5.7c0,5.7,15.2,5.9,17,5.9s17-0.2,17-5.9c0-4.3-8.5-5.4-13.5-5.7l1.7-4.7C60.6,59.6,67.3,51,67.3,41.3z    M53,41.3c0,3.8-3.1,6.9-6.9,6.9c-3.8,0-6.9-3.1-6.9-6.9c0-3.8,3.1-6.9,6.9-6.9C49.9,34.4,53,37.5,53,41.3z M59.6,72.4   c-1,1-5.9,2.5-13.5,2.5c-7.5,0-12.4-1.5-13.5-2.5c0.9-0.9,5-2.2,11.2-2.4l1.1,2.9c0.2,0.5,0.6,0.8,1.2,0.8c0,0,0,0,0,0   c0.5,0,1-0.3,1.2-0.8l1-2.9C54.6,70.2,58.6,71.5,59.6,72.4z"/> */}
              <circle cx={0} cy={0} r={10} />
              {/* <path class="custom-marker" d="M49.032,15.437c-0.205-0.774-0.625-1.6-0.935-2.321C44.386,4.198,36.278,1,29.73,1   c-8.765,0-18.418,5.878-19.707,17.992v2.476c0,0.104,0.035,1.031,0.086,1.495c0.723,5.773,5.277,11.909,8.68,17.684   c3.66,6.185,7.459,12.27,11.222,18.354c2.32-3.97,4.633-7.989,6.9-11.859c0.618-1.134,1.336-2.267,1.954-3.351   c0.412-0.721,1.2-1.443,1.561-2.113c3.66-6.701,9.551-13.455,9.551-20.104v-2.735C49.977,18.118,49.085,15.592,49.032,15.437z    M29.89,27.86c-2.576,0-5.396-1.288-6.786-4.847c-0.208-0.566-0.193-1.701-0.193-1.805v-1.598c0-4.537,3.853-6.598,7.203-6.598   c4.124,0,7.313,3.298,7.313,7.423C37.427,24.562,34.015,27.86,29.89,27.86z" id="Facebook_Places_3_" /> */}
              </Marker>

            <Annotation
              dx={-30}
              dy={30}
              subject={[lattitude, longtitude]}
              stroke="#000"
              strokeWidth={.5}
              curve={0.5}
              markerEnd="url(#custom-arrow)"
            >
              <defs>
                <marker
                  id="custom-arrow"
                  markerWidth={7}
                  markerHeight={7}
                  refX={7}
                  refY={5}
                  orient="auto"
                  markerUnits="userSpaceOnUse"
                >
                  <path
                    d="M1,1 L7,5 L1,9"
                    fill="none"
                    stroke="#000"
                    strokeWidth={1}
                  />
                </marker>
              </defs>
              <text>
                {locationTitle}
              </text>
            </Annotation>
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </div>;
  }
}

export default BasicMap