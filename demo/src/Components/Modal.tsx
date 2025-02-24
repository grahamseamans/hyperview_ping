import Hyperview from 'hyperview';
import MapView from 'react-native-maps';
import React, { PureComponent } from 'react';
import type { HvComponentOptions, StyleSheets, HvComponentOnUpdate } from 'hyperview/src/types';

export type Props = {
  element: Element; // DOM element as a prop, common for all Hyperview components
  stylesheets: StyleSheets; // Stylesheets from Hyperview
  options: HvComponentOptions; // Options for custom behavior and properties
  onUpdate: HvComponentOnUpdate; // Function to handle updates
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }; // Specific to MapView, defines the initial region on the map
};

export default class HyperviewMap extends PureComponent<Props> {
  static namespaceURI = 'https://instawork.com/hyperview-map';
  static localName = 'map';

  render() {
    // Parses the HXML elements attributes.
    // Returns styles and custom props.
    const props = Hyperview.createProps(
      this.props.element,
      this.props.stylesheets,
      this.props.options,
    );
    // Render any HXML sub-elements using Hyperview.
    const children = Hyperview.renderChildren(
      this.props.element,
      this.props.stylesheets,
      this.props.onUpdate,
      this.props.options,
    );

    const region = {
      latitude: parseFloat(props.latitude),
      longitude: parseFloat(props.longitude),
      latitudeDelta: parseFloat(props['latitude-delta']),
      longitudeDelta: parseFloat(props['longitude-delta']),
    };

    return (
      <MapView {...props} region={region} liteMode>
        {children}
      </MapView>
    );
  }
}