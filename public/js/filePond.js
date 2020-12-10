FilePond.registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginImageResize,
	FilePondPluginFileEncode,
	FilePondPluginFileValidateType
)

FilePond.setOptions({
	stylePanelAspectRatio: 250 / 315,
	imageResizeTargetWidth: 315,
	imageResizeTargetHeight: 250,
})

const inputElement = document.querySelector('input[type="file"]');
FilePond.create(inputElement, {
	credits: false,
	acceptedFileTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
	fileValidateTypeLabelExpectedTypes: ''
})
