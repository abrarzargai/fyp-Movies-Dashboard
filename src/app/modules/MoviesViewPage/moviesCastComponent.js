import React from 'react'

function MOviesCastComponent(props) {
  return (
    <>
    <div className="container-fluid ml-4 mb-5 castmaindiv mr-4">
            <div>
        <h4 className="text-left my-2 mb-4 " > Actors</h4>
        <div className="row">
            {props.actors?(
               props.actors.map((mapcast)=>(
                <>
                 {/* castmap  started */}
      <div className="col-xl-1 col-lg-2 col-md-2  col-2 col-sm-2 col-xs-3">
        <img
          src={mapcast.image}
          className="castimage"
          alt="loading....."
        />
        <div className="crewmembername">{mapcast.asCharacter}</div>
        <div className="crewmembername">{mapcast.name}</div>
      </div>
      {/* castmap  started */}
                </>
            )
            )
            ):(
              Cast.map((mapcast)=>(
                <>
                 {/* castmap  started */}
      <div className="col-xl-1 col-lg-2 col-md-2  col-2 col-sm-2 col-xs-3">
        <img
          src={mapcast.image}
          className="castimage"
          alt="loading....."
        />
        <div className="crewmembername">{mapcast.asCharacter}</div>
        <div className="crewmembername">{mapcast.name}</div>
      </div>
      {/* castmap  started */}
                </>
            )
            )
            )
            }
           
        </div>
        </div>
        
      </div>
    </>
  )
}

export default MOviesCastComponent;

const Cast =[
    {
        name:'cast hero 1',
        image :'http://placekitten.com/300/300',
        asCharacter: 'tom'
    },
    {
        name:'cast hero 1',
        image :'http://placekitten.com/300/300',
        asCharacter: 'tom'
    },
    {
        name:'cast hero 1',
        image :'http://placekitten.com/300/300',
        asCharacter: 'tom'
    },
    {
        name:'cast hero 1',
        image :'http://placekitten.com/300/300',
        asCharacter: 'tom'
    },
    {
        name:'cast hero 1',
        image :'http://placekitten.com/300/300',
        asCharacter: 'tom'
    },
   
]