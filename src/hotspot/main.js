class Hotspot {
    constructor(settings) {
        this.settings = settings;
        this.referenceNode = document.getElementById(settings.el)
        this.parentReferenceNode = this.referenceNode.parentElement
        this.statusDialog = "hide"
        this.positionDialogX = 0
        this.positionDialogY = 0

    }
    runWidget() {
        this.hotspotContainer = this.createContainerWidget()
        this.shapeHotspot = this.createHotspot()

        this.hotspotContainer.appendChild(this.shapeHotspot)

        this.setStyles(this.shapeHotspot, this.getStyle('hotspot'))
        this.shapeHotspot.innerHTML = this.settings.hotspot.text

        this.parentReferenceNode.insertBefore(this.hotspotContainer, this.referenceNode)
    }
    createContainerWidget() {
        const settings = [{
            name: 'id',
            value: 'container-hotspot-' + this.settings.name.replace(/\s/g, '-')
        }, {
            name: 'class',
            value: 'container-hotspot-' + this.settings.name.replace(/\s/g, '-')
        }]
        const containerWidget = this.createElement('div', settings)
        this.setStyles(containerWidget, this.getStyle('container'))
        return containerWidget
    }
    createHotspot() {
        const self = this
        let spanHotspot = this.createElement('span', [{
                name: 'id',
                value: 'hotspot-' + this.settings.name.replace(/\s/g, '-')
            },
            {
                name: 'class',
                value: 'circle-hotspot-' + this.settings.name.replace(/\s/g, '-')
            }
        ])

        spanHotspot.addEventListener("click", function() {

            if (self.statusDialog === 'show') {
                self.statusDialog = 'hide'
                self.hideDialog()
            } else if (self.statusDialog === 'hide') {
                self.statusDialog = 'show'
                self.showDialog()
            }
        })
        return spanHotspot
    }
    createDialog() {

        let divDialog = this.createElement('div', [{
            name: 'id',
            value: 'dialog-hotspot-' + this.settings.name.replace(/\s/g, '-')
        }, {
            name: 'class',
            value: 'dialog-hotspot-' + this.settings.name.replace(/\s/g, '-')
        }])
        this.setStyles(divDialog, this.getStyle('dialog'))
        divDialog.innerHTML = this.settings.hotspot.dialog.content

        return divDialog
    }
    showDialog() {
        this.determineDialogPosition()
        this.dialog = this.createDialog()
        this.hotspotContainer.appendChild(this.dialog)
    }
    hideDialog() {
        this.hotspotContainer.removeChild(this.dialog)
    }
    setStyles(element, styles) {
        for (var s in styles) {
            element.style[s] = styles[s];
        }
    }
    createElement(nameElement, settings) {
        let imgElement = document.createElement(nameElement)
        settings.forEach((obj) => {
            imgElement.setAttribute(obj.name, obj.value)
        })
        return imgElement
    }
    getStyle(name) {

        let defaultHotspotStyle = {
            "background": "#F9B326",
            "border-radius": "50%",
            "color": "#424242",
            "cursor": "pointer",
            "display": "block",
            "fontSize": "14px",
            "height": "32px",
            "left": this.settings.hotspot.position.x + "px",
            "line-height": "32px",
            "position": "relative",
            "width": "32px",
            "text-align": "center",
            "top": this.settings.hotspot.position.y + "px",
            "z-index": "1"
        }
        const defaultDialogStyle = {
            "background": "#FFF",
            "border": "1px solid #F9B326",
            "display": "block",
            "color": "#424242",
            "fontSize": "16px",
            "height": "auto",
            "left": this.positionDialogX + "px",
            "line-height": "1.5rem",
            "margin": "auto",
            "min-width": "380px",
            "max-height": "300px",
            "overflow": "auto",
            "padding": "20px",
            "position": "absolute",
            "text-align": "justify",
            "top": this.positionDialogY + "px",
            "width": "380px",
            "z-index": "100000",
            "-webkit-transition": "all 20s",
            "transition": " all 20s"
        }
        const defaultWidgetStyle = {
            "height": "auto",
            "min-width": "480px",
            "max-width": "800px",
            "position": "absolute",
            "width": "480px"
        }
        const all = {
            hotspot: defaultHotspotStyle,
            dialog: defaultDialogStyle,
            container: defaultWidgetStyle
        }
        return all[name]
    }
    determineDialogPosition() {
        const WIDTH_REFERENCE = parseInt(this.referenceNode.width)
        const HEIGHT_REFERENCE = parseInt(this.referenceNode.height)
        const WIDTH_DIALOG = parseInt(this.getStyle('dialog')['width'].replace('px', ''))
        const HEIGHT_DIALOG = parseInt(this.getStyle('dialog')['max-height'].replace('px', ''))
        if (WIDTH_REFERENCE - this.settings.hotspot.position.x - WIDTH_DIALOG <= 0) {
            this.positionDialogX = 0
        } else {
            this.positionDialogX = this.settings.hotspot.position.x + 75
        }
        if (this.settings.hotspot.position.y - HEIGHT_REFERENCE < 0) {
            this.positionDialogY = 10
        } else if (HEIGHT_REFERENCE > HEIGHT_DIALOG) {
            this.positionDialogY = (HEIGHT_REFERENCE - HEIGHT_DIALOG) / 2
            return this.positionDialogY
        } else {
            return this.positionDialogY
        }
    }
}