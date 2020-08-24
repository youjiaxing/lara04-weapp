export default {
    data: {
        page: 1,
        // 数据
        resourceData: [],
        // 更多数据可加载
        noMoreData: false,
        // 是否加载中
        isLoading: false
    },
    async onPullDownRefresh() {
        await this.loadData(true)
        this.page++
        this.noMoreData = false
        wx.stopPullDownRefresh()
    },
    async onReachBottom() {
        if (this.noMoreData || this.isLoading) {
            return
        }
        this.isLoading = true
        this.page++
        await this.loadData()
        this.isLoading = false
    },
    methods: {
        async loadData(reset = false) {
            const resp = await this.fetchData()
            const meta = resp.data.meta

            this.resourceData = reset ? resp.data.data : this.resourceData.concat(resp.data.data)

            this.noMoreData = meta.current_page === meta.last_page
        }
    }
}
