import React, { useState } from "react";
import { Card, CardContent, Typography, Pagination, Box, Button, ToggleButton, ToggleButtonGroup, TextField, MenuItem } from "@mui/material";

const ResponseDisplay = ({ data, fetchData, theme }) => {
    const [viewMode, setViewMode] = useState("vertical");
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("city");
    const [searchQuery, setSearchQuery] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const status = data?.status;
    const message = data?.message;
    const results = data?.data || [];

    // Sorting
    const sortedResults = [...results].sort((a, b) => a[sortBy]?.localeCompare(b[sortBy]));
    
    // Filtering
    const filteredResults = sortedResults.filter(item => item.city.toLowerCase().includes(searchQuery.toLowerCase()));

    // Pagination
    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
    const paginatedData = filteredResults.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // Theme Handling
    const isDarkMode = theme === "dark";

    const handlePageChange = (event, value) => setPage(value);
    const handleViewModeChange = (event, newMode) => setViewMode(newMode);
    const handleSortChange = (event) => setSortBy(event.target.value);
    const handleSearchChange = (event) => setSearchQuery(event.target.value);
    const handleItemsPerPageChange = (event) => setItemsPerPage(parseInt(event.target.value, 10));

    // Styles
    const cardStyles = {
        width: "100%",
        maxWidth: 600,
        height: 200,
        minHeight: 200,
        p: 2,
        borderRadius: "10px",
        border: isDarkMode ? "1px solid #BBBBBB" : "1px solid #333333",
        backgroundColor: isDarkMode ? "#1E1E1E" : "#F5F5F5",
        color: isDarkMode ? "#FFFFFF" : "#000000",
        boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
        margin: "auto",
    };

    const cardContentStyles = {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        whiteSpace: "normal",
        wordBreak: "break-word",
    };

    return (
        <Box sx={{ width: "100%", textAlign: "center" }}>
            {/* Controls */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewModeChange}>
                    <ToggleButton value="vertical">Vertical</ToggleButton>
                    <ToggleButton value="horizontal">Horizontal</ToggleButton>
                </ToggleButtonGroup>
                <TextField label="Search" variant="outlined" size="small" onChange={handleSearchChange} />
                <TextField select label="Sort By" value={sortBy} onChange={handleSortChange} size="small">
                    <MenuItem value="city">City</MenuItem>
                    <MenuItem value="country">Country</MenuItem>
                </TextField>
                <TextField select label="Items Per Page" value={itemsPerPage} onChange={handleItemsPerPageChange} size="small">
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </TextField>
            </Box>

            {/* Data Display */}
            <Box
                sx={{
                    display: viewMode === "horizontal" ? "flex" : "grid",
                    flexWrap: viewMode === "horizontal" ? "wrap" : "unset",
                    gridTemplateColumns: viewMode === "horizontal" ? "repeat(auto-fill, minmax(200px, 1fr))" : "1fr",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    maxWidth: "100%",
                }}
            >
                {paginatedData.map((item, index) => (
                    <Card key={index} sx={cardStyles}>
                        <CardContent sx={cardContentStyles}>
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                                {item.city}, {item.country}
                            </Typography>
                            <Typography variant="body2">
                                🌍 Coordinates: {item.coordinates.lat}, {item.coordinates.lng}
                            </Typography>
                            <Typography variant="body2">
                                ⏳ Response Time: {item.responseTime} ms
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Pagination */}
            {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                    <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
                    <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
                </Box>
            )}
        </Box>
    );
};

export default ResponseDisplay;
