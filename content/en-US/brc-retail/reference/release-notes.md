---
title: "Release Notes"
linkTitle: "Release Notes"
weight: 63
description: >
  Version history, feature updates, bug fixes, and upgrade procedures for BRC Retail Extension.
---

## Release Notes Overview

This section provides comprehensive release history for BRC Retail Extension, including new features, enhancements, bug fixes, and important upgrade information for each version.

## Current Version: 24.4.24986.1

**Release Date:** November 2024
**Compatibility:** Business Central 24.0+
**Runtime:** AL 13.0

### New Features

#### Enhanced Matrix Reporting
- **Matrix Sales Invoice Report**: New comprehensive matrix view for posted sales invoices showing variant combinations in grid format
- **Matrix Purchase Order Report**: Enhanced purchase order reporting with variant matrix visualization
- **Advanced Matrix Calculations**: Improved performance for large variant sets with optimized sorting algorithms
- **Matrix Data Export**: New export capabilities for matrix reports to Excel and CSV formats

#### Advanced Barcode Management
- **EAN-13 Check Digit Support**: Full implementation of EAN-13 check digit calculation and validation
- **Code 128/39 Integration**: Enhanced barcode support for warehouse operations with multiple barcode standards
- **Automatic Barcode Generation**: Configurable automatic EAN code generation using Business Central number series
- **Barcode Label Printing**: Specialized label reports for warehouse activities and item variant identification

#### Seasonal Management System
- **Delivery Season Automation**: Automatic delivery season calculation based on configurable date fields
- **Season Inheritance**: Intelligent season inheritance from document headers to lines
- **Multi-Season Support**: Support for multiple seasonal classifications and date ranges
- **Seasonal Reporting**: Enhanced reporting capabilities with seasonal breakdown analysis

### Enhancements

#### User Experience Improvements
- **Enhanced Sales Line Integration**: Improved variant selection and display on sales document lines
- **Purchase Line Variant Prompting**: Configurable variant prompting on purchase order lines
- **Matrix View Performance**: Optimized matrix view loading for large variant catalogs
- **Multi-Language Descriptions**: Enhanced translation support for variant names and descriptions

#### Integration Enhancements
- **Web Service API**: RESTful API for external system integration with inventory updates
- **Event Subscriber Optimization**: Improved event handling for better performance and reliability
- **Standard BC Integration**: Enhanced integration with standard Business Central processes
- **Error Handling**: Improved error messages and validation throughout the system

#### Data Management
- **FlowField Optimization**: Improved performance for variant-related FlowField calculations
- **Data Validation**: Enhanced validation rules for variant template and value consistency
- **Sorting Management**: Improved sorting logic with support for larger sorting ranges
- **Translation Management**: Streamlined translation processes for multi-language environments

### Technical Improvements

#### Performance Optimizations
- **Query Optimization**: Optimized queries for variant inventory and matrix calculations
- **Memory Management**: Improved memory usage for large variant operations
- **Index Optimization**: Enhanced database indexing for better query performance
- **Background Processing**: Implemented background processing for resource-intensive operations

#### Code Quality
- **Error Handling**: Comprehensive error handling and logging throughout the application
- **Code Documentation**: Enhanced inline documentation and code comments
- **Validation Logic**: Improved validation rules and business logic checks
- **Integration Points**: Cleaner integration with Business Central standard functionality

### Bug Fixes

#### Variant Management
- Fixed issue with variant code generation when using special characters in separator
- Resolved problem with variant sorting not updating correctly on modification
- Corrected FlowField calculations for variant inventory in multi-location scenarios
- Fixed issue with variant template assignment validation

#### Matrix Reporting
- Resolved matrix view display issues with single-dimension variants
- Fixed sorting problems in matrix reports for large variant sets
- Corrected matrix calculation errors when variant values had duplicate sorting numbers
- Fixed matrix export formatting issues in Excel output

#### Document Integration
- Fixed issue with variant information not transferring correctly on document posting
- Resolved problem with delivery season calculation on sales and purchase lines
- Corrected variant description display on printed documents
- Fixed issue with variant prompting not working in specific purchase scenarios

#### Barcode and EAN
- Fixed EAN code generation when number series reaches maximum values
- Resolved check digit calculation errors for certain barcode standards
- Corrected barcode label formatting issues for multi-variant reports
- Fixed issue with duplicate EAN codes in batch generation scenarios

### Known Issues

#### Current Limitations
- Matrix views require both variant dimensions to be configured for optimal display
- Large variant catalogs (>1000 variants per item) may experience slower matrix loading times
- Some legacy barcode scanners may require calibration for new EAN-13 codes

#### Workarounds
- For single-dimension variants, use list views instead of matrix displays
- Implement appropriate filtering for large variant sets in reports
- Test barcode scanning with specific scanner models before full deployment

## Previous Versions

### Version 24.3.x Series

#### 24.3.23485.2 (October 2024)
**Major Updates:**
- Initial implementation of delivery season management
- Enhanced variant template functionality with two-dimension support
- Improved sales and purchase document integration
- Basic matrix reporting capabilities

**Bug Fixes:**
- Resolved variant creation issues with complex template structures
- Fixed performance problems with large variant value sets
- Corrected translation handling for variant descriptions

### Version 24.2.x Series

#### 24.2.22341.1 (September 2024)
**Initial Release Features:**
- Core variant management with template-based structure
- Basic two-dimension variant support (Size + Color)
- Standard Business Central integration with table extensions
- Fundamental barcode management capabilities
- Multi-language support framework

## Upgrade Procedures

### Upgrading to Version 24.4.24986.1

#### Pre-Upgrade Requirements

**System Verification:**
- Verify Business Central version 24.0 or higher
- Ensure adequate system resources for upgrade process
- Backup current configuration and data
- Test upgrade process in sandbox environment

**Configuration Backup:**
```al
// Export current setup for backup
Export: BRC Retail Setup table
Export: BRC Retail Variant Templates
Export: BRC Retail Variants and Variant Values
Document: Current permission assignments
```

#### Upgrade Process

**Automatic Upgrade:**
1. **Extension Update**: Update through Business Central Extension Management
2. **Data Migration**: Automatic migration handles data structure changes
3. **Configuration Preservation**: Existing setup and templates preserved
4. **Validation**: System validates data integrity after upgrade

**Manual Steps Required:**
1. **Review New Features**: Evaluate new features for your business needs
2. **Update Permissions**: Review and assign new permission requirements if needed
3. **Test Functionality**: Validate critical business processes after upgrade
4. **User Training**: Train users on new features and enhancements

#### Post-Upgrade Validation

**Functionality Testing:**
- [ ] Verify variant creation and management works correctly
- [ ] Test matrix reporting with existing data
- [ ] Validate barcode generation and printing
- [ ] Check delivery season calculations
- [ ] Confirm multi-language translations
- [ ] Test API integration if applicable

**Performance Verification:**
- [ ] Monitor matrix report generation times
- [ ] Check variant lookup performance
- [ ] Validate FlowField calculation speed
- [ ] Monitor overall system performance

### Compatibility Information

#### Business Central Compatibility
- **Minimum Version**: Business Central 24.0.0.0
- **Recommended Version**: Business Central 24.4 or higher
- **Platform Support**: Cloud deployment only
- **Runtime Requirements**: AL Runtime 13.0

#### Extension Compatibility
- **Compatible Extensions**: Most standard Business Central extensions
- **Known Conflicts**: None identified in current version
- **Testing Recommendation**: Test with other extensions in sandbox environment

#### Data Compatibility
- **Backward Compatibility**: Full compatibility with previous BRC Retail Extension versions
- **Data Migration**: Automatic migration for version updates
- **Configuration Preservation**: Setup and templates preserved during upgrades

## Breaking Changes History

### Version 24.4.24986.1
**No Breaking Changes**: This version maintains full backward compatibility

### Version 24.3.x to 24.4.x
**Configuration Changes:**
- New setup options for delivery season management
- Enhanced barcode configuration options
- Additional permission requirements for new features

**Data Structure Changes:**
- New fields added to existing tables (non-breaking)
- Enhanced FlowField definitions for better performance
- Additional translation tables for multi-language support

### Version 24.2.x to 24.3.x
**Significant Changes:**
- Variant template structure enhanced with delivery season support
- Matrix calculation engine completely rewritten for better performance
- New event subscriber implementations for improved integration

**Migration Required:**
- Variant templates require review and potential reconfiguration
- Matrix report configurations need validation
- User permissions may require updates

## Future Roadmap

### Planned Features (Future Versions)

#### Version 24.5 (Planned Q1 2025)
- **Enhanced API Capabilities**: Extended web service functionality
- **Advanced Analytics**: Built-in analytics dashboards for variant performance
- **Improved E-commerce Integration**: Direct integration with major e-commerce platforms
- **Enhanced Barcode Support**: Additional barcode standards and mobile scanning

#### Version 24.6 (Planned Q2 2025)
- **AI-Powered Variant Suggestions**: Machine learning for optimal variant structures
- **Advanced Seasonal Forecasting**: Predictive analytics for seasonal demand
- **Enhanced Mobile Support**: Mobile-optimized variant management interfaces
- **Advanced Workflow Integration**: Power Automate and workflow enhancements

### Long-Term Vision
- **IoT Integration**: Integration with IoT devices for real-time inventory tracking
- **Advanced Analytics Platform**: Comprehensive business intelligence for variant performance
- **Global Localization**: Enhanced support for international retail operations
- **Industry-Specific Templates**: Pre-configured templates for different retail verticals

## Support and Feedback

### Getting Support for Upgrades

**Pre-Upgrade Support:**
- Upgrade planning assistance available
- Sandbox environment setup guidance
- Custom testing scenario development
- Risk assessment and mitigation planning

**Post-Upgrade Support:**
- Technical support for upgrade issues
- Performance optimization assistance
- User training and documentation
- Business process validation support

### Providing Feedback

**Feature Requests:**
- Submit feature requests through partner channels
- Participate in user feedback sessions
- Join beta testing programs for early access
- Contribute to product roadmap discussions

**Bug Reports:**
- Report issues through official support channels
- Provide detailed reproduction steps
- Include system configuration information
- Participate in issue resolution testing

### Release Communication

**Stay Informed:**
- Subscribe to release notifications
- Follow product updates through partner portals
- Join user community forums
- Attend webinars and training sessions

**Release Scheduling:**
- Quarterly major updates planned
- Monthly minor updates and bug fixes
- Security updates as needed
- Advance notice for significant changes

## Documentation Updates

### Documentation Version History

**Version 24.4 Documentation:**
- Complete rewrite of user guide with enhanced procedures
- New troubleshooting section with comprehensive issue resolution
- Enhanced API documentation with detailed examples
- Updated setup and configuration guides

**Ongoing Documentation Improvements:**
- Regular updates based on user feedback
- Enhanced examples and use cases
- Video tutorials and training materials
- Multi-language documentation support

This comprehensive release information ensures you have complete visibility into BRC Retail Extension development, features, and upgrade procedures. For specific questions about any release or upgrade planning, contact the BrightCom Solutions AB support team.