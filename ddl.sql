-- Activer l'extension UUID pour générer des identifiants uniques
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table Property
CREATE TABLE Property (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    available BOOLEAN NOT NULL,
    city VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    number_of_rooms INT NOT NULL,
    additional_info TEXT,
    type_de_logement VARCHAR(255) NOT NULL,
    nombre_de_voyageurs INT NOT NULL,
    emplacement TEXT NOT NULL,
    conditions_annulation TEXT NOT NULL,
    bookings_this_month INT NOT NULL
);

-- Table Booking
CREATE TABLE Booking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES Property(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    number_of_guests INT NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) NOT NULL,
    payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'paid', 'refunded')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table BookingSetting
CREATE TABLE BookingSetting (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES Property(id) ON DELETE CASCADE,
    min_stay_days INT NOT NULL,
    max_stay_days INT NOT NULL,
    advance_booking_days INT NOT NULL,
    check_in_time TIME NOT NULL,
    check_out_time TIME NOT NULL,
    instant_booking BOOLEAN NOT NULL,
    cancellation_policy TEXT NOT NULL
);

-- Table HouseRule
CREATE TABLE HouseRule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES Property(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    mandatory BOOLEAN NOT NULL
);

-- Table Task
CREATE TABLE Task (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    property_id UUID NOT NULL REFERENCES Property(id) ON DELETE CASCADE,
    reservation_id UUID REFERENCES Booking(id),
    completed BOOLEAN NOT NULL
);

-- Table Review
CREATE TABLE Review (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES Property(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cleanliness INT NOT NULL CHECK (cleanliness BETWEEN 1 AND 5),
    communication INT NOT NULL CHECK (communication BETWEEN 1 AND 5),
    check_in INT NOT NULL CHECK (check_in BETWEEN 1 AND 5),
    accuracy INT NOT NULL CHECK (accuracy BETWEEN 1 AND 5),
    location INT NOT NULL CHECK (location BETWEEN 1 AND 5),
    value INT NOT NULL CHECK (value BETWEEN 1 AND 5)
);

-- Table Reservation
CREATE TABLE Reservation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest VARCHAR(255) NOT NULL,
    property UUID NOT NULL REFERENCES Property(id) ON DELETE CASCADE,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Confirmed', 'Pending', 'Cancelled')) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    contact VARCHAR(255) NOT NULL
);

-- Table Notification
CREATE TABLE Notification (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) CHECK (type IN ('info', 'warning', 'error', 'success')) NOT NULL,
    read BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table CalendarEvent
CREATE TABLE CalendarEvent (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES Property(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    type VARCHAR(20) CHECK (type IN ('reservation', 'blocked', 'maintenance')) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT
);


-- Table Amenity
CREATE TABLE Amenity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    icon TEXT NOT NULL,
    category VARCHAR(20) CHECK (category IN ('basic', 'safety', 'luxury', 'outdoor')) NOT NULL,
    description TEXT
);
