import html2canvas from "html2canvas";


export const downloadImg = async (element, imageName) => {
	const canvas = await html2canvas(element, {scrollX: -window.scrollX, scrollY: -window.scrollY});
	const data = canvas.toDataURL("image/png", 1.0);

	const fakeLink = window.document.createElement("a");
	fakeLink.style = "display:none;";
	fakeLink.download = imageName;

	fakeLink.href = data;

	document.body.appendChild(fakeLink);
	fakeLink.click();
	document.body.removeChild(fakeLink);

	fakeLink.remove();
};
