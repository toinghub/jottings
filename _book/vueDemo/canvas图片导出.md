# canvas 图片导出



```vue
<template>
	<div class="out-page">
		<div
			id="sharePage"
			ref="sharePage"
			class="share-page"
		>
			<img
				v-if="hint"
				class="bg"
				src="../../assets/images/bg@2x.png"
				@load="save"
				alt=""
			/>
			</div>
		</div>
	</div>
</template>
<script >
	import html2canvas from "html2canvas";
	const imgUrl = ref("");
	const sharePage: any = ref(null);//ref 获取节点

	const save = () => {
        //将ref获取到的节点的内容转换成bese64图片格式
		html2canvas(sharePage.value, { useCORS: true }).then((canvas) => {
			let dataURL = canvas.toDataURL("image/png");
			imgUrl.value = dataURL;
		});
	};
</script>
```

