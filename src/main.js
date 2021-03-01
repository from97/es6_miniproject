class Blog {
	constructor() {
		this.setInitVariables();
		this.registerEvents();
		this.likedSet = new Set();
	}

	setInitVariables() {
		this.blogList = document.querySelector(".blogList > ul");
	}

	registerEvents() {
		const startBtn = document.querySelector(".start");
		const dataURL = "/data/data.json";
		startBtn.addEventListener("click", () => {
			this.setInitData(dataURL);
		})
		this.blogList.addEventListener("click", ({target}) => {
			const targetClassName = target.className;
			const postTitle = target.previousElementSibling.textContent;
			if (targetClassName !== "like" && targetClassName !== 'unlike') return;
			if (targetClassName == 'unlike') {
				target.className = 'like';
				target.innerText = 'Like';
				this.likedSet.delete(postTitle);
			}
			else {
				target.className = 'unlike';
				target.innerText = 'Liked';
				this.likedSet.add(postTitle);
			}
			this.updateLikedList();
		})
	}

	updateLikedList() {
		const ul = document.querySelector('.like-list > ul');
		let likedSum = "";
		this.likedSet.forEach((v) => {
			likedSum += `<li>${v}</li>`;
		})
		ul.innerHTML = likedSum;

	}

	setInitData(dataURL) {
		this.getData(dataURL, this.insertPosts.bind(this));
	}

	getData(dataURL, fn) {
		const oReq = new XMLHttpRequest();

		oReq.addEventListener("load", () => {
			const list = JSON.parse(oReq.responseText).body;
			fn(list);
		})

		oReq.open('GET', dataURL);
		oReq.send();
	}

	insertPosts(list) {
		list.forEach((v) => {
			this.blogList.innerHTML += `
				<li>
					<a href=${v.link}>${v.title}</a>
					<div class="like">Like</div>
				</li>
				`;
		})
	}
}

export default Blog;
