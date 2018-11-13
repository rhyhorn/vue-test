export default {
    data: {
        categories: [{
            id: 1,
            name: 'new'
        }],
        currentCategory: null,
        games: [],
        currentIndex: 0
    },
    computed: {
        filteredGames() {
            return (this.currentCategory === null)
                ? this.games
                : this.games.filter((game) => game.categoryId === this.currentCategory);
        },
        visibleGames() {
            return this.filteredGames.slice(0, 12 + this.currentIndex * 3);
        },
        showMoreButton() {
            return (12 + this.currentIndex * 3) < this.filteredGames.length;
        }
    },
    created() {
        this.games = Array(40)
            .fill(null)
            .map((item, index) => {
                return {
                    id: index,
                    name: `Game ${index}`,
                    categoryId: index
                }
            });
    },
    methods: {
        changeCategory(categoryId) {
            this.currentIndex = 0;
            if (categoryId === this.currentCategory) {
                this.currentCategory = null;

                return;
            }
            this.currentCategory = categoryId;
        },
        showMoreGames() {
            this.currentIndex += 3;
        }
    }
};
