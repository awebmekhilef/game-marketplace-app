FilePond.registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginImageResize,
	FilePondPluginFileEncode,
	FilePondPluginFileValidateType,
	FilePondPluginImageTransform
)

FilePond.setOptions({
	stylePanelAspectRatio: 250 / 315,
	imageResizeTargetWidth: 315,
	imageResizeTargetHeight: 250,
})

const inputElement = document.querySelector('input[type="file"]');
const pond = FilePond.create(inputElement, {
	credits: false,
	acceptedFileTypes: ['image/png', 'image/jpg', 'image/jpeg'],
	fileValidateTypeLabelExpectedTypes: '',
	imageResizeMode: 'force'
})

// pond.addFile('<%= game.cover %>')
