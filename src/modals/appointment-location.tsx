import { MapContainer, TileLayer, Marker, useMap, MarkerProps } from 'react-leaflet';
import { FunctionComponent, useEffect } from 'react';
import styled from '@emotion/styled';

import { Appointment } from '~/entities/appointment';

export type LatLng = {
  lat: number;
  lng: number;
};

export type AppointmentLocationProps = {
  appointment: Appointment;
};

export const AppointmentLocation: FunctionComponent<AppointmentLocationProps> = ({ appointment }) => {
  const lat = appointment.clinic.address.latitude;
  const lng = appointment.clinic.address.longitude;

  const position = { lat, lng };

  const Map = styled(MapContainer)`
    width: 100%;
    height: 400px;
    border-radius: 15px;
    margin-bottom: 10px;
  `;

  return (
    <Map center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Pointer position={position} />
    </Map>
  );
};

const Pointer: FunctionComponent<MarkerProps> = props => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, []);

  return <Marker {...props} />;
};
