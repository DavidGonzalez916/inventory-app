import React, { useState, useEffect } from 'react';
// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { ItemList } from './ItemList';
import { Item } from './Item';
import Form from './Form.js'
import { Header } from './Header.js';
import Cart from './Cart.js'
import { Search } from './Search.js';
import { User } from './User.js';
export const App = () => {

	const [items, setItems] = useState([]);
	const [currentItem, setCurrentItem] = useState(false)
	const [item, setItem] = useState("")
	const [toAdd, setToAdd] = useState(false)
	const [viewCart, setViewCart] = useState(false)
	const [cart, setCart] = useState([])
	const [toSearch, setToSearch] = useState(false)
	const [search, setSearch] = useState("")
	const [searching, setSearching] = useState(false)
	const [signingIn, setSigningIn] = useState(false)
	const [signedIn, setSignedIn] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)

	async function fetchItems() { //fetching itms in database to save items to state
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemData = await response.json();
			console.log(itemData)
			setItems(itemData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}


	useEffect(() => { // to call render on currentItem and toAdd 

		fetchItems();

	}, [currentItem, toAdd]);

	function handleClick() { // handle click to add to inventory
		if (!toAdd && isAdmin == true) {
			setToAdd(true)
		} else if (!toAdd) {
			alert("You must be signed in as an admin to add to inventory")
		} else {
			setToAdd(false)
		}
	}

	if (!currentItem) { // shows list of items if currentItem is false, shows 1 item if true
		return (
			<main>
				<div class="container">



					{signingIn ? (<User setSigningIn={setSigningIn} signedin={signedIn} setSignedIn={setSignedIn} setIsAdmin={setIsAdmin} />) : 
					(<>
						{viewCart ? (<Cart setCart={setCart} setViewCart={setViewCart} cart={cart} />) : // ternary to render cart if viewCart is true
							(<>
								{toSearch ? (<Search items={items} search={search} // ternary to render search if toSearch is true
									setSearch={setSearch} setToSearch={setToSearch} searching={searching}
									setSearching={setSearching} currentItem={currentItem} setCurrentItem={setCurrentItem} />)
									: (<>
										{!toAdd // ternary to render update if toAdd is true
											? (
												<>
													<div class="row p-2 button-bar">
														<div class="col-md-4 offset-md-8 ">
															<button onClick={() => handleClick()}>Add to our inventory</button>

															<button onClick={() => setToSearch(true)}>Search</button>

															<button onClick={() => setViewCart(true)}>{cart.length > 0 ? `Cart (${cart.length})` : `Cart`}</button>

															<button onClick={() => setSigningIn(true)}>Sign In</button>
														</div>
													</div>
													<Header />
													<ItemList items={items} setCurrentItem={setCurrentItem} />
												</>

											) : (
												<>
													<div class="col">
														<div class="row">
															<h3 class="form-title">Add To it!</h3>
														</div>
														<div class="row">
															<Form toAdd={toAdd} setToAdd={setToAdd} />
														</div>

														<div class="row">
															<button class="back-button" onClick={handleClick}>Back</button>
														</div>
													</div>
												</>
											)}
									</>)}
							</>)}
					</>)}
				</div>
			</main>
		)
	} else {

		return (
			<Item cart={cart} setCart={setCart} item={item} currentItem={currentItem} setCurrentItem={setCurrentItem} />
		)
	}

}