import React from 'react';
import './ElementsStyles.css';

export default function Filter(props) {
    const cuisines = ["Italian", "American", "Irish", "Spanish", "Steak", "Thai"]
    const diningStyle = ["CheapEats", "MidRange", "FineDining"]

    return <div className="filterbar">
        <div className="cuisine">
        <h4>Cuisine</h4>
         <form action="#">
                 <p>
                    {cuisines.map((cuisine)=>{
                        return <label>
                            <input type="checkbox"
                                value={cuisine}
                                onChange={props.handleFilterOptions}
                            />
                            <span>{cuisine}</span>
                        </label>
                    })}
                </p>
                 
             </form>
            </div>
         <div className="dining-style">
            <h4>Dining Style</h4>
            <form action="">
              <p>
                  {diningStyle.map((dStyle)=>{
                      return <label>
                          <input 
                            value={dStyle} 
                            type="checkbox"
                            onChange={props.handleFilterOptions}
                          />
                          <span>{dStyle}</span>
                      </label>
                  })}
                
              </p>
            </form>
           </div>
     </div>

}

{/* <label>
                    <input type="checkbox" 
                    checked={this.state.diningOption === "Cheap Eats"}
                    onClick={(e)=>{this.handleClickedDining(e)}}
                    value="Cheap Eats"
                    />
                    <span>Cheap Eats</span>
                </label>
                <label>
                    <input type="checkbox" 
                    checked={this.state.diningOption === "Mid Range"}
                    onClick={(e)=>{this.handleClickedDining(e)}}
                    value="Mid Range"
                    />
                    <span>Mid Range</span>
                </label>
                <label>
                    <input type="checkbox" 
                    checked={this.state.diningOption === "Fine Dining"}
                    onClick={(e)=>{this.handleClickedDining(e)}}
                    value="Fine Dining"
                    />
                    <span>Fine Dining</span>
                </label> */}

{/* <label>
                     <input type="checkbox" 
                     checked={this.state.cuisineOption === "Italian"}
                     onClick={(e)=>{this.handleClickedCuisine(e)}}
                     value="Italian"
                     />
                     <span>Italian</span>
                 </label>
                 <label>
                     <input type="checkbox" 
                     checked={this.state.cuisineOption === "American"} 
                     onClick={(e)=>{this.handleClickedCuisine(e)}}
                     value="American"
                     />
                     <span>American</span>
                 </label>
                 <label>
                     <input type="checkbox" 
                     checked={this.state.cuisineOption === "Irish"} 
                     onClick={(e)=>{this.handleClickedCuisine(e)}}
                     value="Irish"
                     />
                     <span>Irish</span>
                 </label>
                 <label>
                     <input 
                     id="indeterminate-checkbox" 
                     type="checkbox" 
                     checked={this.state.cuisineOption === "Spanish"}
                     onClick={(e)=>{this.handleClickedCuisine(e)}}
                     value="Spanish"
                     />
                     <span>Spanish</span>
                 </label>
                 <label>
                     <input 
                     value="Steak"
                     type="checkbox" 
                     onClick={(e)=>{this.handleClickedCuisine(e)}}
                     checked={this.state.cuisineOption === "Steak"}  />
                     <span>Steak</span>
                 </label>
                 <label>
                     <input type="checkbox" 
                     checked={this.state.cuisineOption === "Thai"} 
                     onClick={(e)=>{this.handleClickedCuisine(e)}}
                     value="Thai"
                     />
                     <span>Thai</span>
                 </label> */}