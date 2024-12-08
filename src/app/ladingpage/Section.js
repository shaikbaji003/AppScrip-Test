'use client';
import '@/styles/landingpage/landingpage.css';
import { faCheck, faChevronDown, faChevronLeft, faChevronUp, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Heart from '@/Images/landingpage/heart.png';


const roboto=Roboto({
    weight:'400',
    subsets:['latin'],
    display:'swap'
})
function Section({apidataprops})
{

        let[rightFiltersShow,setRightFiltersShow]=useState(false);
        let[rightFiltersSelectedValue,setRightFiltersSelectedValue]=useState('RECOMMENDED');
        let[showFilter,setShowFilter]=useState(true);
        let[leftClickedFilterCategoriesIndex,setLeftClickedFilterCategoriesIndex]=useState(-1);
        let[leftsideClickedFiltersValue,setLeftSodeClickedFilterValues]=useState({
            men:false,
            women:false,
            kids:false
        })
        let[apiData,setApiData]=useState(apidataprops);

        useEffect(()=>{
            filterArrayData();
        },[rightFiltersSelectedValue]);

        useEffect(()=>{
            filterByLeftFilters();
        },[leftsideClickedFiltersValue]);

        useEffect(()=>{
            if(!showFilter&&window.innerWidth<=1024)
            {
                document.body.style.overflow='hidden';
            }else{
                document.body.style.overflow='auto';
            }

        },[showFilter])

        function handleCheckBoxClicked(e)
        {
            let obj={...leftsideClickedFiltersValue};
            if(e.target.id.includes('men'))
            {
                obj.men=true;
            }
            else if(e.target.id.includes('wo'))
            {
                obj.women=true;
            }
            else if(e.target.id.includes('kid')){
                obj.kids=true;
            }
           

            setLeftSodeClickedFilterValues({...obj});
            
        }


        //to reset left side filters

        function resetleftFilter()
        {
            setApiData(apidataprops);                   //to set all api data
            setLeftClickedFilterCategoriesIndex(-1);    //to close the left side filter content
            let obj={...leftsideClickedFiltersValue};   //to remove selected chockbox filters
            obj.kids=false;
            obj.men=false;
            obj.women=false;
            setLeftSodeClickedFilterValues(obj);    
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);      //to remove all checked boxes

        }

        //if some one clicked or right side filters
        function filterArrayData () {
            let data = [...apiData]; 
        
            if (rightFiltersSelectedValue === 'RECOMMENDED') {
                // Sort by id which is like a intial data(recommended)
                data.sort((a, b) => a.id - b.id);
                
            } 
            else if (rightFiltersSelectedValue === 'Popular') {
                // Sort by rating (rate)
                data.sort((a, b) => b.rating.rate - a.rating.rate);
            } 
            else if (rightFiltersSelectedValue === 'Price : high to low') {
                // Sort by price (high to low)
                data.sort((a, b) => b.price - a.price);
            } 
            else if (rightFiltersSelectedValue === 'Price : low to high') {
                // Sort by price (low to high)
                data.sort((a, b) => a.price - b.price);
            } 
            else if (rightFiltersSelectedValue === 'Newest first') {
                // Sort by category (alphabetically)
                data.sort((a, b) => a.category.localeCompare(b.category));
            }
        
            setApiData([...data]);
        };

        //if left side filter is clicked
        function filterByLeftFilters()
        {
                let data = [...apidataprops]; //all data comes from api
        
                // this array is used tostore the all the  selected left side catagories 
                let selectedCategories = [];
        
                // Check each category and add it to selectedCategories if the checkbox is checked
                if (leftsideClickedFiltersValue.men) {
                    selectedCategories.push("men's clothing");
                }
                if (leftsideClickedFiltersValue.women) {
                    selectedCategories.push("jewelery");
                }
                if (leftsideClickedFiltersValue.kids) {
                    selectedCategories.push("electronics");
                }
        
                // If there are any selected categories, filter the data to include only those items
                if (selectedCategories.length > 0) {
                    data = data.filter(item => selectedCategories.includes(item.category));
                }
        
                setApiData([...data]);
        }

    function handleLeftFilterCategoryClick(index)
    {
        if(index==leftClickedFilterCategoriesIndex)
            {
                setLeftClickedFilterCategoriesIndex(-1);
                return;
            }
    
            setLeftClickedFilterCategoriesIndex(index);
    }


    return(
        <>
        <div className={"  "+roboto.className}>
        <section >
            <div className="flex justify-between items-center section-main-content section-first-links-box">
                <div className='flex items-baseline'>
                    <h6 className="filter-titles not-for-tablet-mobile">{apidataprops.length} Items</h6>
                    <div className="flex items-baseline hide-filter-container cursor-pointer not-for-tablet-mobile">
                        <FontAwesomeIcon icon={faChevronLeft} style={{color: "#BFC8CD",width:'16px',marginRight:'8px'}}  className={showFilter?'transition rotate-180':'transition '}/>
                        <h6 className="filter-titles custom-lightgrey-text underline" onClick={()=>{setShowFilter(!showFilter)}}>{showFilter?'SHOW FILTER':'HIDE FILTER'}</h6>
                    </div>
                </div>
                <div className="for-tablet-mobile filter-titles custom-lightgrey-text" onClick={()=>{setShowFilter(!showFilter)}}>FILTER</div>
                <div className="for-tablet-mobile filter-center-border"></div>
                <div className='filternames-container'>
                    <div className="flex items-baseline cursor-pointer" onClick={()=>{setRightFiltersShow(!rightFiltersShow)}}>
                        <h6 className="filter-titles">{rightFiltersSelectedValue}</h6>
                        <FontAwesomeIcon icon={faChevronDown} style={{color: "black",width:'16px',marginLeft:'8px'}} className={rightFiltersShow?'transition rotate-180':'transition'} />
                    </div>
                    <div className={rightFiltersShow?"right-side-remaining-filter-container filter-height-visible":"right-side-remaining-filter-container"}>
                        <div className="flex items-baseline cursor-pointer" onClick={()=>{setRightFiltersSelectedValue('RECOMMENDED')}}>
                            {rightFiltersSelectedValue=='RECOMMENDED'?<FontAwesomeIcon icon={faCheck} style={{color: "black",width:'16px',marginRight:'8px'}}  />:null}
                            <h6 className="filter-subtitle custom-grey-text">RECOMMENDED</h6>
                        </div>
                        <div className="flex items-baseline cursor-pointer" onClick={()=>{setRightFiltersSelectedValue('Newest first')}}>
                            {rightFiltersSelectedValue=='Newest first'?<FontAwesomeIcon icon={faCheck} style={{color: "black",width:'16px',marginRight:'8px'}}  />:null}
                            <h6 className="filter-subtitle custom-grey-text">Newest first</h6>
                        </div>
                        <div className="flex items-baseline cursor-pointer" onClick={()=>{setRightFiltersSelectedValue('Popular')}}>
                            {rightFiltersSelectedValue=='Popular'?<FontAwesomeIcon icon={faCheck} style={{color: "black",width:'16px',marginRight:'8px'}}  />:null}
                            <h6 className="filter-subtitle custom-grey-text">popular</h6>
                        </div>

                        <div className="flex items-baseline cursor-pointer" onClick={()=>{setRightFiltersSelectedValue('Price : high to low')}}>
                            {rightFiltersSelectedValue=='Price : high to low'?<FontAwesomeIcon icon={faCheck} style={{color: "black",width:'16px',marginRight:'8px'}}  />:null}
                            <h6 className="filter-subtitle custom-grey-text">Price : high to low</h6>
                        </div>

                        <div className="flex items-baseline cursor-pointer" onClick={()=>{setRightFiltersSelectedValue('Price : low to high')}}>
                            {rightFiltersSelectedValue=='Price : low to high'?<FontAwesomeIcon icon={faCheck} style={{color: "black",width:'16px',marginRight:'8px'}}  />:null}
                            <h6 className="filter-subtitle custom-grey-text">Price : low to high</h6>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="flex section-main-content section-left-filter-products-parent-container">
                <div className={!showFilter?'left-filter-container width-visible':'left-filter-container'}>
                    <div className="for-tablet-mobile close-container">
                        <FontAwesomeIcon icon={faXmark} style={{color: "#BFC8CD",width:'20px',marginLeft:'auto'}}  onClick={()=>{setShowFilter(!showFilter)}}/>
                    </div>
                    <div>
                        <input type="checkbox" name="customize" id="customize" />
                        <label htmlFor='customize' className='filter-titles'>&nbsp;&nbsp;CUSTOMIZABLE</label>
                    </div>

                    <div className="left-filter-details-container">
                        <div className="">
                            <div className="flex justify-between items-baseline cursor-pointer" onClick={()=>{handleLeftFilterCategoryClick(0)}}>
                                <h6 className="filter-titles custom-black-text">IDEAL FOR</h6>
                                <FontAwesomeIcon icon={faChevronDown} style={{color: "#BFC8CD",width:'16px',marginRight:'8px'}} className={leftClickedFilterCategoriesIndex==0?'transition rotate-180':'transition'}/>
                            </div>
                            <h6 className="filter-subtitle custom-black-text">All</h6>
                        </div>
                        <div className={leftClickedFilterCategoriesIndex==0?"men-women-kids-checkbox-container filter-category-height":"men-women-kids-checkbox-container"}>
                            <h6 className="filter-subtitle underline custom-lightgrey-text cursor-pointer" onClick={resetleftFilter}>Unselect all</h6>
                            
                            <div>
                                <input type="checkbox" name="customize" id="men" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='men' className='filter-subtitle'>&nbsp;&nbsp;Men</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="wo" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='wo' className='filter-subtitle'>&nbsp;&nbsp;Women</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="kids" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='kids' className='filter-subtitle'>&nbsp;&nbsp;Baby & Kids</label>
                            </div>
                        </div>
                    </div>
                    <div className="left-filter-details-container">
                        <div className="">
                            <div className="flex justify-between items-baseline cursor-pointer" onClick={()=>{handleLeftFilterCategoryClick(1)}}>
                                <h6 className="filter-titles custom-black-text">OCCASION</h6>
                                <FontAwesomeIcon icon={faChevronDown} style={{color: "#BFC8CD",width:'16px',marginRight:'8px'}} className={leftClickedFilterCategoriesIndex==1?'transition rotate-180':'transition'}/>
                            </div>
                            <h6 className="filter-subtitle custom-black-text">All</h6>
                        </div>
                        <div className={leftClickedFilterCategoriesIndex==1?"men-women-kids-checkbox-container filter-category-height":"men-women-kids-checkbox-container"}>
                            <h6 className="filter-subtitle underline custom-lightgrey-text" onClick={resetleftFilter}>Unselect all</h6>
                            
                            <div>
                                <input type="checkbox" name="customize" id="men1" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='men1' className='filter-subtitle'>&nbsp;&nbsp;Men</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="wo1" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='wo1' className='filter-subtitle'>&nbsp;&nbsp;Women</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="kids1" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='kids1' className='filter-subtitle'>&nbsp;&nbsp;Baby & Kids</label>
                            </div>
                        </div>
                    </div>
                    <div className="left-filter-details-container">
                        <div className="">
                            <div className="flex justify-between items-baseline cursor-pointer" onClick={()=>{handleLeftFilterCategoryClick(2)}}>
                                <h6 className="filter-titles custom-black-text">OCCASION</h6>
                                <FontAwesomeIcon icon={faChevronDown} style={{color: "#BFC8CD",width:'16px',marginRight:'8px'}} className={leftClickedFilterCategoriesIndex==2?'transition rotate-180':'transition'}/>
                            </div>
                            <h6 className="filter-subtitle custom-black-text">All</h6>
                        </div>
                        <div className={leftClickedFilterCategoriesIndex==2?"men-women-kids-checkbox-container filter-category-height":"men-women-kids-checkbox-container"}>
                            <h6 className="filter-subtitle underline custom-lightgrey-text" onClick={resetleftFilter}>Unselect all</h6>
                            
                            <div>
                                <input type="checkbox" name="customize" id="men2" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='men2' className='filter-subtitle'>&nbsp;&nbsp;Men</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="wo2" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='wo2' className='filter-subtitle'>&nbsp;&nbsp;Women</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="kids2" onChange={handleCheckBoxClicked} />
                                <label htmlFor='kids2' className='filter-subtitle'>&nbsp;&nbsp;Baby & Kids</label>
                            </div>
                        </div>
                    </div>

                    <div className="left-filter-details-container">
                        <div className="">
                            <div className="flex justify-between items-baseline cursor-pointer" onClick={()=>{handleLeftFilterCategoryClick(3)}}>
                                <h6 className="filter-titles custom-black-text">WORK</h6>
                                <FontAwesomeIcon icon={faChevronDown} style={{color: "#BFC8CD",width:'16px',marginRight:'8px'}} className={leftClickedFilterCategoriesIndex==3?'transition rotate-180':'transition'}/>
                            </div>
                            <h6 className="filter-subtitle custom-black-text">All</h6>
                        </div>
                        <div className={leftClickedFilterCategoriesIndex==3?"men-women-kids-checkbox-container filter-category-height":"men-women-kids-checkbox-container"}>
                            <h6 className="filter-subtitle underline custom-lightgrey-text" onClick={resetleftFilter}>Unselect all</h6>
                            
                            <div>
                                <input type="checkbox" name="customize" id="men3" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='men3' className='filter-subtitle'>&nbsp;&nbsp;Men</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="wo3" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='wo3' className='filter-subtitle'>&nbsp;&nbsp;Women</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="kids3" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='kids3' className='filter-subtitle'>&nbsp;&nbsp;Baby & Kids</label>
                            </div>
                        </div>
                    </div>

                    <div className="left-filter-details-container">
                        <div className="">
                            <div className="flex justify-between items-baseline cursor-pointer" onClick={()=>{handleLeftFilterCategoryClick(4)}}>
                                <h6 className="filter-titles custom-black-text">FABRIC</h6>
                                <FontAwesomeIcon icon={faChevronDown} style={{color: "#BFC8CD",width:'16px',marginRight:'8px'}} className={leftClickedFilterCategoriesIndex==4?'transition rotate-180':'transition'}/>
                            </div>
                            <h6 className="filter-subtitle custom-black-text">All</h6>
                        </div>
                        <div className={leftClickedFilterCategoriesIndex==4?"men-women-kids-checkbox-container filter-category-height":"men-women-kids-checkbox-container"}>
                            <h6 className="filter-subtitle underline custom-lightgrey-text" onClick={resetleftFilter}>Unselect all</h6>
                            
                            <div>
                                <input type="checkbox" name="customize" id="men4" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='men4' className='filter-subtitle'>&nbsp;&nbsp;Men</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="wo4" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='wo4' className='filter-subtitle'>&nbsp;&nbsp;Women</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="kids4" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='kids4' className='filter-subtitle'>&nbsp;&nbsp;Baby & Kids</label>
                            </div>
                        </div>
                    </div>

                    <div className="left-filter-details-container">
                        <div className="">
                            <div className="flex justify-between items-baseline cursor-pointer" onClick={()=>{handleLeftFilterCategoryClick(5)}}>
                                <h6 className="filter-titles custom-black-text">SEGMENT</h6>
                                <FontAwesomeIcon icon={faChevronDown} style={{color: "#BFC8CD",width:'16px',marginRight:'8px'}} className={leftClickedFilterCategoriesIndex==5?'transition rotate-180':'transition'}/>
                            </div>
                            <h6 className="filter-subtitle custom-black-text">All</h6>
                        </div>
                        <div className={leftClickedFilterCategoriesIndex==5?"men-women-kids-checkbox-container filter-category-height":"men-women-kids-checkbox-container"}>
                            <h6 className="filter-subtitle underline custom-lightgrey-text" onClick={resetleftFilter}>Unselect all</h6>
                            
                            <div>
                                <input type="checkbox" name="customize" id="men5" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='men5' className='filter-subtitle'>&nbsp;&nbsp;Men</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="wo5" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='wo5' className='filter-subtitle'>&nbsp;&nbsp;Women</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="kid5" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='kid5' className='filter-subtitle'>&nbsp;&nbsp;Baby & Kids</label>
                            </div>
                        </div>
                    </div>

                    <div className="left-filter-details-container">
                        <div className="">
                            <div className="flex justify-between items-baseline cursor-pointer" onClick={()=>{handleLeftFilterCategoryClick(6)}}>
                                <h6 className="filter-titles custom-black-text">SUITABLE FOR</h6>
                                <FontAwesomeIcon icon={faChevronDown} style={{color: "#BFC8CD",width:'16px',marginRight:'8px'}} className={leftClickedFilterCategoriesIndex==6?'transition rotate-180':'transition'}/>
                            </div>
                            <h6 className="filter-subtitle custom-black-text">All</h6>
                        </div>
                        <div className={leftClickedFilterCategoriesIndex==6?"men-women-kids-checkbox-container filter-category-height":"men-women-kids-checkbox-container"}>
                            <h6 className="filter-subtitle underline custom-lightgrey-text" onClick={resetleftFilter}>Unselect all</h6>
                            
                            <div>
                                <input type="checkbox" name="customize" id="men6"  onChange={handleCheckBoxClicked}/>
                                <label htmlFor='men6' className='filter-subtitle'>&nbsp;&nbsp;Men</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="wo6" onChange={handleCheckBoxClicked} />
                                <label htmlFor='wo6' className='filter-subtitle'>&nbsp;&nbsp;Women</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="kids6" onChange={handleCheckBoxClicked} />
                                <label htmlFor='kids6' className='filter-subtitle'>&nbsp;&nbsp;Baby & Kids</label>
                            </div>
                        </div>
                    </div>

                    <div className="left-filter-details-container">
                        <div className="">
                            <div className="flex justify-between items-baseline cursor-pointer" onClick={()=>{handleLeftFilterCategoryClick(7)}}>
                                <h6 className="filter-titles custom-black-text">RAW MATERIALS</h6>
                                <FontAwesomeIcon icon={faChevronDown} style={{color: "#BFC8CD",width:'16px',marginRight:'8px'}} className={leftClickedFilterCategoriesIndex==7?'transition rotate-180':'transition'}/>
                            </div>
                            <h6 className="filter-subtitle custom-black-text">All</h6>
                        </div>
                        <div className={leftClickedFilterCategoriesIndex==7?"men-women-kids-checkbox-container filter-category-height":"men-women-kids-checkbox-container"}>
                            <h6 className="filter-subtitle underline custom-lightgrey-text" onClick={resetleftFilter}>Unselect all</h6>
                            
                            <div>
                                <input type="checkbox" name="customize" id="men7" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='men7' className='filter-subtitle'>&nbsp;&nbsp;Men</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="wo7" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='wo7' className='filter-subtitle'>&nbsp;&nbsp;Women</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="kids7" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='kids7' className='filter-subtitle'>&nbsp;&nbsp;Baby & Kids</label>
                            </div>
                        </div>
                    </div>

                    <div className="left-filter-details-container">
                        <div className="">
                            <div className="flex justify-between items-baseline cursor-pointer" onClick={()=>{handleLeftFilterCategoryClick(8)}}>
                                <h6 className="filter-titles custom-black-text">PATTERN</h6>
                                <FontAwesomeIcon icon={faChevronDown} style={{color: "#BFC8CD",width:'16px',marginRight:'8px'}} className={leftClickedFilterCategoriesIndex==8?'transition rotate-180':'transition'}/>
                            </div>
                            <h6 className="filter-subtitle custom-black-text">All</h6>
                        </div>
                        <div className={leftClickedFilterCategoriesIndex==8?"men-women-kids-checkbox-container filter-category-height":"men-women-kids-checkbox-container"}>
                            <h6 className="filter-subtitle underline custom-lightgrey-text" onClick={resetleftFilter}>Unselect all</h6>
                            
                            <div>
                                <input type="checkbox" name="customize" id="men" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='men' className='filter-subtitle'>&nbsp;&nbsp;Men</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="women" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='women' className='filter-subtitle'>&nbsp;&nbsp;Women</label>
                            </div>
                            <div>
                                <input type="checkbox" name="customize" id="kids" onChange={handleCheckBoxClicked}/>
                                <label htmlFor='kids' className='filter-subtitle'>&nbsp;&nbsp;Baby & Kids</label>
                            </div>
                        </div>
                    </div>
                   
                </div>
                
                <div className='products-container'>

                {apiData.length>0&&apiData.map((element,index)=>{
                     return <div className="product-container">
                                <Image src={element.image} width={290} height={370} alt='product' className='product-image'/>
                                <div className="product-info-container">
                                    <Image src={Heart} width={24} height={24} className='cursor-pointer produ-heart-img'/>
                                    <h5 className="filter-titles custom-black-text bold">{element.title}</h5>
                                    <h6 className="filter-subtitle custom-grey-text">Price - {element.price} ₹</h6>
                                    <h6 className="filter-subtitle custom-grey-text">catagory - {element.category}</h6>
                                    <h6 className="filter-subtitle custom-grey-text">rating - {element.rating.rate}/5</h6>
                                    <h6 className="filter-subtitle custom-grey-text">{element.rating.count} items left</h6>
                                    <div className="">
                                    </div>
                                </div>
                            </div>
                })}
                </div>
            </div>  
        </section>

        </div>
        </>
    )
}

export default Section;